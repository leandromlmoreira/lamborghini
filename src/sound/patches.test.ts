import { describe, expect, it } from "vitest";
import { distortionCurve, revDuration, revPlan } from "./patches";

describe("revPlan", () => {
  it("sobe o giro de pico conforme a potência", () => {
    const calm = revPlan({ power: 350, cylinders: 12 });
    const wild = revPlan({ power: 750, cylinders: 12 });
    expect(wild.peakHz).toBeGreaterThan(calm.peakHz);
    expect(wild.attack).toBeLessThan(calm.attack);
    expect(wild.pops.length).toBeGreaterThan(calm.pops.length);
  });

  it("mantém o pico acima da marcha lenta", () => {
    const plan = revPlan({ power: 610, cylinders: 10 });
    expect(plan.peakHz).toBeGreaterThan(plan.settleHz);
    expect(plan.settleHz).toBeGreaterThan(plan.idleHz);
  });

  it("dá marcha lenta mais grave para o V10 do que para o V12", () => {
    expect(revPlan({ power: 600, cylinders: 10 }).idleHz).toBeLessThan(revPlan({ power: 600, cylinders: 12 }).idleHz);
  });

  it("coloca os estalos do escape depois de tirar o pé e antes do fim", () => {
    const plan = revPlan({ power: 700, cylinders: 12 });
    plan.pops.forEach((time) => {
      expect(time).toBeGreaterThan(plan.attack + plan.hold);
      expect(time).toBeLessThan(revDuration(plan));
    });
  });

  it("aceita potências fora da faixa sem estourar", () => {
    const low = revPlan({ power: 50, cylinders: 12 });
    const high = revPlan({ power: 5000, cylinders: 12 });
    expect(low.peakHz).toBe(250);
    expect(high.peakHz).toBe(430);
  });
});

describe("distortionCurve", () => {
  it("é simétrica e limitada", () => {
    const curve = distortionCurve(30, 512);
    expect(curve).toHaveLength(512);
    expect(Math.max(...curve)).toBeLessThanOrEqual(1.01);
    expect(curve[0]).toBeCloseTo(-1, 1);
  });
});
