import { distortionCurve, revDuration, revPlan, type Cue, type RevInput, type RevPlan } from "./patches";

type Rig = {
  context: AudioContext;
  master: GainNode;
  noise: AudioBuffer;
};

type AudioContextClass = typeof AudioContext;

export const soundSupported = typeof window !== "undefined" && Boolean(audioContextClass());

let rig: Rig | null = null;
let enabled = false;
let armed = false;

function audioContextClass(): AudioContextClass | undefined {
  if (typeof window === "undefined") return undefined;
  const scope = window as unknown as { AudioContext?: AudioContextClass; webkitAudioContext?: AudioContextClass };
  return scope.AudioContext ?? scope.webkitAudioContext;
}

function buildRig(): Rig | null {
  const Context = audioContextClass();
  if (!Context) return null;
  const context = new Context();
  const master = context.createGain();
  const limiter = context.createDynamicsCompressor();
  master.gain.value = 0.55;
  limiter.threshold.value = -10;
  limiter.ratio.value = 6;
  master.connect(limiter).connect(context.destination);
  return { context, master, noise: whiteNoise(context) };
}

function whiteNoise(context: AudioContext): AudioBuffer {
  const buffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  return buffer;
}

function unlock() {
  if (!enabled) return;
  rig = rig ?? buildRig();
  if (rig && rig.context.state === "suspended") rig.context.resume().catch(() => undefined);
}

export function setSoundEnabled(next: boolean, fromGesture = false) {
  enabled = next;
  if (next && fromGesture) unlock();
  if (next && !fromGesture) armSound();
}

export function armSound() {
  if (armed || typeof window === "undefined") return;
  armed = true;
  const handle = () => {
    unlock();
    if (rig) {
      window.removeEventListener("pointerdown", handle, true);
      window.removeEventListener("keydown", handle, true);
      armed = false;
    }
  };
  window.addEventListener("pointerdown", handle, true);
  window.addEventListener("keydown", handle, true);
}

export function playCue(cue: Cue, rev?: RevInput) {
  if (!enabled || !rig || rig.context.state !== "running") return;
  const start = rig.context.currentTime + 0.01;
  if (cue === "click") mechanicalClick(rig, start, 1);
  if (cue === "tick") mechanicalClick(rig, start, 0.55);
  if (cue === "whoosh") whoosh(rig, start);
  if (cue === "rev") engineRev(rig, start, revPlan(rev ?? { power: 600, cylinders: 12 }));
}

function envelope(context: AudioContext, start: number, peak: number, decay: number): GainNode {
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + decay);
  return gain;
}

function noiseBurst(target: Rig, start: number, filter: BiquadFilterNode, peak: number, decay: number) {
  const source = target.context.createBufferSource();
  source.buffer = target.noise;
  const gain = envelope(target.context, start, peak, decay);
  source.connect(filter).connect(gain).connect(target.master);
  source.start(start, Math.random() * 0.5);
  source.stop(start + decay + 0.02);
}

function mechanicalClick(target: Rig, start: number, level: number) {
  const { context } = target;
  const snap = context.createBiquadFilter();
  snap.type = "bandpass";
  snap.frequency.value = 3400;
  snap.Q.value = 1.4;
  noiseBurst(target, start, snap, 0.6 * level, 0.03);

  const latch = context.createBiquadFilter();
  latch.type = "highpass";
  latch.frequency.value = 5200;
  noiseBurst(target, start + 0.024, latch, 0.22 * level, 0.018);

  const body = context.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(210, start);
  body.frequency.exponentialRampToValueAtTime(120, start + 0.05);
  const bodyGain = envelope(context, start, 0.28 * level, 0.06);
  body.connect(bodyGain).connect(target.master);
  body.start(start);
  body.stop(start + 0.08);
}

function whoosh(target: Rig, start: number) {
  const { context } = target;
  const source = context.createBufferSource();
  source.buffer = target.noise;
  source.loop = true;
  const band = context.createBiquadFilter();
  band.type = "bandpass";
  band.Q.value = 0.8;
  band.frequency.setValueAtTime(380, start);
  band.frequency.exponentialRampToValueAtTime(2600, start + 0.24);
  band.frequency.exponentialRampToValueAtTime(520, start + 0.6);
  const gain = context.createGain();
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.32, start + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.62);
  const chain = band.connect(gain);
  if (typeof context.createStereoPanner === "function") {
    const pan = context.createStereoPanner();
    pan.pan.setValueAtTime(-0.7, start);
    pan.pan.linearRampToValueAtTime(0.7, start + 0.6);
    chain.connect(pan).connect(target.master);
  } else {
    chain.connect(target.master);
  }
  source.connect(band);
  source.start(start);
  source.stop(start + 0.66);
}

function automateRpm(param: AudioParam, plan: RevPlan, start: number, ratio: number) {
  const peakAt = start + plan.attack;
  const liftAt = peakAt + plan.hold;
  const end = start + revDuration(plan);
  param.setValueAtTime(plan.idleHz * ratio, start);
  param.exponentialRampToValueAtTime(plan.peakHz * ratio, peakAt);
  param.linearRampToValueAtTime(plan.peakHz * 1.04 * ratio, liftAt);
  param.exponentialRampToValueAtTime(plan.settleHz * ratio, liftAt + plan.release * 0.5);
  param.exponentialRampToValueAtTime(plan.idleHz * ratio, end);
}

function engineRev(target: Rig, start: number, plan: RevPlan) {
  const { context } = target;
  const end = start + revDuration(plan);
  const mix = context.createGain();
  mix.gain.value = 0.7;

  const voices: [OscillatorType, number, number][] = [
    ["sawtooth", 1, 0.5],
    ["sawtooth", 1.007, 0.32],
    ["square", 0.5, 0.36],
  ];
  const oscillators = voices.map(([type, ratio, level]) => {
    const oscillator = context.createOscillator();
    oscillator.type = type;
    automateRpm(oscillator.frequency, plan, start, ratio);
    const voiceGain = context.createGain();
    voiceGain.gain.value = level;
    oscillator.connect(voiceGain).connect(mix);
    return oscillator;
  });

  const firing = context.createOscillator();
  firing.type = "square";
  automateRpm(firing.frequency, plan, start, 1 / 6);
  const firingDepth = context.createGain();
  firingDepth.gain.value = 0.28;
  firing.connect(firingDepth).connect(mix.gain);

  const shaper = context.createWaveShaper();
  shaper.curve = distortionCurve(plan.grit) as Float32Array<ArrayBuffer>;
  shaper.oversample = "2x";

  const tone = context.createBiquadFilter();
  tone.type = "lowpass";
  tone.Q.value = 3.2;
  tone.frequency.setValueAtTime(480, start);
  tone.frequency.exponentialRampToValueAtTime(3400, start + plan.attack);
  tone.frequency.exponentialRampToValueAtTime(820, end);

  const body = context.createGain();
  body.gain.setValueAtTime(0.0001, start);
  body.gain.exponentialRampToValueAtTime(0.4, start + 0.06);
  body.gain.linearRampToValueAtTime(0.52, start + plan.attack);
  body.gain.linearRampToValueAtTime(0.3, end - 0.35);
  body.gain.exponentialRampToValueAtTime(0.0001, end);

  mix.connect(shaper).connect(tone).connect(body).connect(target.master);
  [...oscillators, firing].forEach((oscillator) => {
    oscillator.start(start);
    oscillator.stop(end + 0.05);
  });

  plan.pops.forEach((offset, index) => exhaustPop(target, start + offset, index));
}

function exhaustPop(target: Rig, start: number, index: number) {
  const { context } = target;
  const crack = context.createBiquadFilter();
  crack.type = "bandpass";
  crack.frequency.value = 900 + (index % 3) * 260;
  crack.Q.value = 1.6;
  noiseBurst(target, start, crack, 0.5, 0.07);

  const thump = context.createOscillator();
  thump.type = "sine";
  thump.frequency.setValueAtTime(110, start);
  thump.frequency.exponentialRampToValueAtTime(55, start + 0.06);
  const thumpGain = envelope(context, start, 0.35, 0.08);
  thump.connect(thumpGain).connect(target.master);
  thump.start(start);
  thump.stop(start + 0.1);
}
