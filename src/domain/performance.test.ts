import { describe, expect, it } from "vitest";
import { formatSeconds, performanceBars, performanceOf } from "./performance";

describe("performanceOf", () => {
  it("usa a referência do modelo quando o nome é conhecido", () => {
    const veneno = performanceOf("Veneno", "modern");
    expect(veneno).toMatchObject({ power: 750, zeroToHundred: 2.8, topSpeed: 355, cylinders: 12, estimated: false });
  });

  it("diferencia versões da mesma família", () => {
    expect(performanceOf("Aventador LP 750-4 Superveloce", "modern").power).toBe(750);
    expect(performanceOf("Aventador LP 700-4", "modern").power).toBe(700);
    expect(performanceOf("2015 Lamborghini Huracán GT3", "modern").topSpeed).toBe(290);
    expect(performanceOf("Huracán LP 610-4", "modern").power).toBe(610);
    expect(performanceOf("Countach 25th Anniversary", "legend").power).toBe(455);
    expect(performanceOf("Countach LP400", "classic").power).toBe(375);
  });

  it("estima pela era quando o modelo não está na tabela", () => {
    const unknown = performanceOf("Protótipo X", "classic");
    expect(unknown.estimated).toBe(true);
    expect(unknown.zeroToHundred).toBeGreaterThan(performanceOf("Protótipo Y", "modern").zeroToHundred);
  });
});

describe("performanceBars", () => {
  it("normaliza os valores entre 0 e 1", () => {
    const bars = performanceBars(performanceOf("Veneno", "modern"));
    Object.values(bars).forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  it("dá barra maior para quem acelera mais rápido", () => {
    const miura = performanceBars(performanceOf("Miura P400", "classic"));
    const veneno = performanceBars(performanceOf("Veneno", "modern"));
    expect(veneno.acceleration).toBeGreaterThan(miura.acceleration);
  });

  it("limita valores fora da escala", () => {
    const bars = performanceBars({ power: 2000, zeroToHundred: 1, topSpeed: 500, engine: "", cylinders: 16, estimated: true });
    expect(bars).toEqual({ power: 1, acceleration: 1, topSpeed: 1 });
  });
});

describe("formatSeconds", () => {
  it("usa vírgula decimal", () => {
    expect(formatSeconds(2.8)).toBe("2,8");
    expect(formatSeconds(3)).toBe("3,0");
  });
});
