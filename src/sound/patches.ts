export type Cue = "click" | "tick" | "whoosh" | "rev";

export type RevInput = {
  power: number;
  cylinders: number;
};

export type RevPlan = {
  idleHz: number;
  peakHz: number;
  settleHz: number;
  attack: number;
  hold: number;
  release: number;
  grit: number;
  pops: number[];
};

const POWER_FLOOR = 300;
const POWER_CEILING = 800;

function unit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function revPlan({ power, cylinders }: RevInput): RevPlan {
  const intensity = unit((power - POWER_FLOOR) / (POWER_CEILING - POWER_FLOOR));
  const idleHz = cylinders >= 12 ? 62 : 54;
  const attack = lerp(0.52, 0.34, intensity);
  const hold = 0.16;
  const release = 1.05;
  const popCount = 2 + Math.round(intensity * 3);
  const popStart = attack + hold + 0.12;
  const pops = Array.from({ length: popCount }, (_, index) => popStart + index * (0.11 + (index % 2) * 0.05));

  return {
    idleHz,
    peakHz: lerp(250, 430, intensity),
    settleHz: idleHz * 1.35,
    attack,
    hold,
    release,
    grit: lerp(18, 46, intensity),
    pops,
  };
}

export function revDuration(plan: RevPlan): number {
  return plan.attack + plan.hold + plan.release;
}

export function distortionCurve(amount: number, samples = 1024): Float32Array {
  const curve = new Float32Array(samples);
  for (let index = 0; index < samples; index += 1) {
    const x = (index * 2) / samples - 1;
    curve[index] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
