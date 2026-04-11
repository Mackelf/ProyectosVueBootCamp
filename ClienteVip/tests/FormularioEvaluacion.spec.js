import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import FormularioEvaluacion from "../src/components/FormularioEvaluacion.vue";

const llenarFormulario = async (wrapper, overrides = {}) => {
  const datos = {
    nombre: "Juan Pérez",
    correo: "juan@correo.com",
    telefono: "912345678",
    ingresos: 1500000,
    monto: 500000,
    tipoTrabajador: "dependiente",
    ...overrides,
  };

  await wrapper.find("#nombre").setValue(datos.nombre);
  await wrapper.find("#correo").setValue(datos.correo);
  await wrapper.find("#telefono").setValue(datos.telefono);
  await wrapper.find("#ingresos").setValue(datos.ingresos);
  await wrapper.find("#monto").setValue(datos.monto);
  await wrapper.find("#trabajador").setValue(datos.tipoTrabajador);

  return datos;
};

describe("Estado inicial del componente", () => {
  it("no muestra la previsualización al montar el componente", () => {
    const wrapper = mount(FormularioEvaluacion);

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).not.toContain("Previsualización de la solicitud");
  });
});

describe("Envío correcto del formulario", () => {
  it("muestra la previsualización al completar todos los campos correctamente", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper);
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(true);
    expect(wrapper.text()).toContain("Previsualización de la solicitud");
  });
});

describe("Campos obligatorios", () => {
  it("no muestra previsualización si el nombre está vacío", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { nombre: "" });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("El nombre es obligatorio");
  });

  it("no muestra previsualización si el correo está vacío", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { correo: "" });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("El correo es obligatorio");
  });

  it("no muestra previsualización si el teléfono está vacío", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { telefono: "" });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("El teléfono es obligatorio");
  });

  it("no muestra previsualización si no se selecciona tipo de trabajador", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { tipoTrabajador: "" });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("Selecciona el tipo de trabajador");
  });
});

describe("Datos numéricos inválidos", () => {
  it("no muestra previsualización si los ingresos son 0", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { ingresos: 0 });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("Los ingresos deben ser mayores a 0");
  });

  it("no muestra previsualización si el monto es negativo", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { monto: -1000 });
    await wrapper.find("button").trigger("click");

    expect(wrapper.find(".alert").exists()).toBe(false);
    expect(wrapper.text()).toContain("El monto debe ser mayor a 0");
  });
});

describe("Contenido de la previsualización", () => {
  it("muestra correctamente los datos ingresados", async () => {
    const wrapper = mount(FormularioEvaluacion);

    const datos = await llenarFormulario(wrapper);
    await wrapper.find("button").trigger("click");

    const texto = wrapper.text();

    expect(texto).toContain(datos.nombre);
    expect(texto).toContain(datos.correo);
    expect(texto).toContain(datos.telefono);
    expect(texto).toContain("dependiente");
  });
});

describe("Cambio de tipo de trabajador", () => {
  it("refleja correctamente el cambio de dependiente a independiente", async () => {
    const wrapper = mount(FormularioEvaluacion);

    await llenarFormulario(wrapper, { tipoTrabajador: "dependiente" });
    await wrapper.find("#trabajador").setValue("independiente");
    await wrapper.find("button").trigger("click");

    const previsualizacion = wrapper.find(".alert");

    expect(previsualizacion.exists()).toBe(true);
    expect(previsualizacion.text()).toContain("independiente");
    expect(previsualizacion.text()).not.toContain("Tipo de trabajador: dependiente");
  });
});