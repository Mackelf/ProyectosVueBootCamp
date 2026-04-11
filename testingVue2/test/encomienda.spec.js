import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Encomienda from "@/components/Encomienda.vue"; 

describe("Encomienda.vue", () => {

  // Prueba 1: Estado inicial
  it("no muestra la etiqueta al cargar el componente", () => {
    const wrapper = mount(Encomienda);

    expect(wrapper.find(".resultado").exists()).toBe(false);
  });

  // Prueba 2: Cálculo correcto envío Normal sin recargo (5kg * 1000 = 5000)
  it("calcula correctamente con envío Normal y peso menor a 10kg", async () => {
    const wrapper = mount(Encomienda);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Mario");
    await inputs[1].setValue("5");
    await wrapper.find("select").setValue("normal"); 

    await wrapper.get("button").trigger("click");

    expect(wrapper.find(".resultado").exists()).toBe(true);
    expect(wrapper.text()).toContain("5000"); // 5kg * $1000
  });

  // Prueba 3: Cálculo con recargo (12kg express: 12*1500 + 2000 = 20000)
  it("aplica recargo de $2000 cuando el peso supera 10kg", async () => {
    const wrapper = mount(Encomienda);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Ana");
    await inputs[1].setValue("12");
    await wrapper.find("select").setValue("express");

    await wrapper.get("button").trigger("click");

    expect(wrapper.find(".resultado").exists()).toBe(true);
    expect(wrapper.text()).toContain("20000"); // 12*1500=18000 + 2000 recargo
  });

  // Prueba 4: Datos incompletos (sin seleccionar tipo de envío)
  it("no muestra la etiqueta si faltan campos", async () => {
    const wrapper = mount(Encomienda);
    const inputs = wrapper.findAll("input");

    await inputs[0].setValue("Mario");
    await inputs[1].setValue("5");
    // select queda vacío

    await wrapper.get("button").trigger("click");

    expect(wrapper.find(".resultado").exists()).toBe(false);
  });

});