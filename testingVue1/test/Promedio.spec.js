import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Promedio from "@/components/Promedio.vue";

describe("Promedio.vue", () => {

  // Prueba 1: Estado inicial
  it("no muestra resultado al cargar el componente", () => {
    const wrapper = mount(Promedio);

    expect(wrapper.find(".resultado").exists()).toBe(false);
  });

  // Prueba 2: Cálculo correcto del promedio
  it("muestra el promedio correcto al ingresar tres números válidos", async () => {
    const wrapper = mount(Promedio);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("10");
    await inputs[1].setValue("20");
    await inputs[2].setValue("30");

    await wrapper.get("button").trigger("click");

    expect(wrapper.find(".resultado").exists()).toBe(true);
    expect(wrapper.text()).toContain("20.00"); // (10+20+30)/3
  });

  // Prueba 3: Datos incompletos
  it("no muestra el promedio si faltan campos", async () => {
    const wrapper = mount(Promedio);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("10");
    await inputs[1].setValue("20");
    // inputs[2] queda vacío

    await wrapper.get("button").trigger("click");

    expect(wrapper.find(".resultado").exists()).toBe(false);
  });

});