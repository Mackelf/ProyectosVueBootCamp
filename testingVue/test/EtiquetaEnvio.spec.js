//Prueba Unitaria: Render inicial del componente EtiquetaEnvio.vue

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import EtiquetaEnvio from "@/components/EtiquetaEnvio.vue";

describe("EtiquetaEnvio.vue", () => {
  it("renders the correct label", () => {
    const wrapper = mount(EtiquetaEnvio, )

    expect(wrapper.text()).not.toContain("Etiqueta de Envío")
    });
});


//segunda prueba unitaria: llenar formulario y verificar que los datos se actualicen correctamente
it("updates data when form is submitted", async () => {
    const wrapper = mount(EtiquetaEnvio, );
    const input = wrapper.findAll("input");
    await input[0].setValue("John Doe");
    await input[1].setValue("123 Main St");
    await input[2].setValue("Cityville");

    await wrapper.get("button").trigger("click");

    expect(wrapper.text()).toContain("John Doe");
    expect(wrapper.text()).toContain("123 Main St");
    expect(wrapper.text()).toContain("Cityville");


  });
//Tercera prueba unitaria: Validación simple
it('no muestra la etiqueta si faltan datos', async () => {
    const wrapper = mount(EtiquetaEnvio)

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('Juan Pérez')
    await inputs[1].setValue('')

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).not.toContain('Etiqueta de Envío')
})