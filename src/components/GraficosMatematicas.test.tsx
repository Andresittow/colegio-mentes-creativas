import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GraficosMatematicas from "./GraficosMatematicas";

describe("GraficosMatematicas", () => {
  test("Muestra la primera pregunta al iniciar", () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText("¿Qué día se registraron más ventas?")).toBeInTheDocument();
  });

  test("Permite seleccionar una respuesta", async () => {
    render(<GraficosMatematicas />);
    const button = screen.getByText("Viernes");
    await userEvent.click(button);
    expect(screen.getByTestId("score")).toHaveTextContent("Puntaje actual: 1");
  });

  test("Muestra la siguiente pregunta después de responder", async () => {
    render(<GraficosMatematicas />);
    const button = screen.getByText("Viernes");
    await userEvent.click(button);
    // Espera un poco porque avanza en setTimeout
    await new Promise((r) => setTimeout(r, 1100));
    expect(screen.getByText("¿Cuántas ventas se registraron el miércoles?")).toBeInTheDocument();
  });

  test("Muestra los resultados al finalizar", async () => {
    render(<GraficosMatematicas />);
    const firstAnswer = screen.getByText("Viernes");
    await userEvent.click(firstAnswer);
    await new Promise((r) => setTimeout(r, 1100));
    const secondAnswer = screen.getByText("38");
    await userEvent.click(secondAnswer);
    await new Promise((r) => setTimeout(r, 1100));
    expect(screen.getByText("¡Actividad Completada!")).toBeInTheDocument();
  });

  test("Cambia el tipo de gráfico al seleccionar opción", async () => {
    render(<GraficosMatematicas />);
    expect(screen.getByText(/Tipo de gráfico seleccionado: barras/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText("Líneas"));
    expect(screen.getByText(/Tipo de gráfico seleccionado: líneas/i)).toBeInTheDocument();
    await userEvent.click(screen.getByText("Circular"));
    expect(screen.getByText(/Tipo de gráfico seleccionado: circular/i)).toBeInTheDocument();
  });

  test("Deshabilita opciones tras seleccionar una respuesta", async () => {
    render(<GraficosMatematicas />);
    const option = screen.getByText("Viernes");
    await userEvent.click(option);
    const allOptions = ["Lunes", "Martes", "Jueves", "Viernes"]; 
    allOptions.forEach((text) => {
      expect(screen.getByText(text)).toBeDisabled();
    });
  });
});
