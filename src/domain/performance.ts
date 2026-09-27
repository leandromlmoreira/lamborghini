import type { Era } from "./catalog";

export type Performance = {
  power: number;
  zeroToHundred: number;
  topSpeed: number;
  engine: string;
  cylinders: number;
  estimated: boolean;
};

type Reference = Omit<Performance, "estimated">;

const REFERENCES: { match: RegExp; spec: Reference }[] = [
  { match: /veneno/i, spec: { power: 750, zeroToHundred: 2.8, topSpeed: 355, engine: "V12 6.5", cylinders: 12 } },
  { match: /superveloce|lp\s?750/i, spec: { power: 750, zeroToHundred: 2.8, topSpeed: 350, engine: "V12 6.5", cylinders: 12 } },
  { match: /aventador/i, spec: { power: 700, zeroToHundred: 2.9, topSpeed: 350, engine: "V12 6.5", cylinders: 12 } },
  { match: /gt3/i, spec: { power: 585, zeroToHundred: 3.2, topSpeed: 290, engine: "V10 5.2", cylinders: 10 } },
  { match: /gr\.?\s?4/i, spec: { power: 520, zeroToHundred: 3.5, topSpeed: 285, engine: "V10 5.2", cylinders: 10 } },
  { match: /hurac[aá]n/i, spec: { power: 610, zeroToHundred: 3.2, topSpeed: 325, engine: "V10 5.2", cylinders: 10 } },
  { match: /25th|anniversary/i, spec: { power: 455, zeroToHundred: 4.7, topSpeed: 295, engine: "V12 5.2", cylinders: 12 } },
  { match: /countach/i, spec: { power: 375, zeroToHundred: 5.6, topSpeed: 290, engine: "V12 3.9", cylinders: 12 } },
  { match: /diablo/i, spec: { power: 575, zeroToHundred: 3.8, topSpeed: 338, engine: "V12 6.0", cylinders: 12 } },
  { match: /miura/i, spec: { power: 350, zeroToHundred: 6.7, topSpeed: 280, engine: "V12 3.9", cylinders: 12 } },
];

const ERA_ESTIMATES: Record<Era, Reference> = {
  classic: { power: 350, zeroToHundred: 6.5, topSpeed: 275, engine: "V12", cylinders: 12 },
  legend: { power: 500, zeroToHundred: 4.2, topSpeed: 320, engine: "V12", cylinders: 12 },
  modern: { power: 640, zeroToHundred: 3.1, topSpeed: 330, engine: "V10", cylinders: 10 },
};

export const PERFORMANCE_SCALE = {
  power: 800,
  topSpeed: 360,
  quickest: 2.5,
  slowest: 7.5,
};

export function performanceOf(name: string, era: Era): Performance {
  const reference = REFERENCES.find((item) => item.match.test(name));
  return reference ? { ...reference.spec, estimated: false } : { ...ERA_ESTIMATES[era], estimated: true };
}

function clampUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function performanceBars(performance: Performance) {
  const { power, topSpeed, quickest, slowest } = PERFORMANCE_SCALE;
  return {
    power: clampUnit(performance.power / power),
    acceleration: clampUnit((slowest - performance.zeroToHundred) / (slowest - quickest)),
    topSpeed: clampUnit(performance.topSpeed / topSpeed),
  };
}

export function formatSeconds(seconds: number): string {
  return seconds.toFixed(1).replace(".", ",");
}
