import { describe, it, expect } from "vitest";
import { calcularDescuento, obtenerDescuento } from "../src/utils/DescuentoService";
import { mount } from "@vue/test-utils";
import CalculaDescuento from "../src/components/CalculaDescuento.vue";

describe("obtenerDescuento", () => {
  it('retorna 20 para cliente "vip"', () => {
    expect(obtenerDescuento("vip")).toBe(20);
  });
});

describe("calcularDescuento", () => {
  it("aplica 20% de descuento a cliente vip", () => {
    const resultado = calcularDescuento("vip", 1000);
    expect(resultado).toBe(800);
  });

  it("aplica 10% de descuento a cliente normal", () => {
    const resultado = calcularDescuento("normal", 1000);
    expect(resultado).toBe(900);
  });

  it("no aplica descuento si el tipo de cliente no existe", () => {
    const resultado = calcularDescuento("otro", 1000);
    expect(resultado).toBe(1000);
  });

  it("lanza un error si el precio es negativo", () => {
    expect(() => calcularDescuento("normal", -100)).toThrow(
      "El precio no puede ser negativo"
    );
  });
});

describe("CalculaDescuento.vue - estado inicial", () => {
  it("no muestra resultado al montar el componente", () => {
    const wrapper = mount(CalculaDescuento);
    expect(wrapper.text()).not.toContain("Precio final");
    expect(wrapper.find(".alert").exists()).toBe(false);
  });
});

describe("CalculaDescuento.vue - interacción del usuario", () => {
  it("muestra el precio final correcto para cliente vip", async () => {
    const wrapper = mount(CalculaDescuento);

    await wrapper.find("select").setValue("vip");
    await wrapper.find("input[type='number']").setValue(1000);
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(true);
    expect(wrapper.text()).toContain("800");
  });

  it("muestra el precio final correcto para cliente normal", async () => {
    const wrapper = mount(CalculaDescuento);

    await wrapper.find("select").setValue("normal");
    await wrapper.find("input[type='number']").setValue(1000);
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(true);
    expect(wrapper.text()).toContain("900");
  });
});