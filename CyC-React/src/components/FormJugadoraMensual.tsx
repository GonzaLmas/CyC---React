import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  FechaInicioCiclo: string;
  DiasCicloPremenstrualAnterior: string;
  DiasSangrado: string;
  DiasDuracionCicloAnteriores: string;
  Anticonceptivas: string;
}

export default function FormJugadoraMensual() {
  const [formData, setFormData] = useState<FormData>({
    FechaInicioCiclo: "",
    DiasCicloPremenstrualAnterior: "",
    DiasSangrado: "",
    DiasDuracionCicloAnteriores: "",
    Anticonceptivas: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div
              className="text-white text-center p-4"
              style={{ backgroundColor: "#575dd0ff" }}
            >
              <h3 className="text-lg font-semibold">Complete el Formulario</h3>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Fecha de inicio */}
                <div className="mb-4 field-group">
                  <label htmlFor="FechaInicioCiclo" className="block mb-1">
                    ¿Qué día comenzó su ciclo?
                  </label>
                  <input
                    type="date"
                    id="FechaInicioCiclo"
                    name="FechaInicioCiclo"
                    value={formData.FechaInicioCiclo}
                    onChange={handleChange}
                    className="date-input"
                    required
                  />
                </div>

                {/* Días premenstruales */}
                <div className="mb-4 field-group">
                  <label
                    htmlFor="DiasCicloPremenstrualAnterior"
                    className="block mb-1"
                  >
                    ¿Cuántos días premenstruales tuvo previos a la menstruación?
                  </label>
                  <select
                    id="DiasCicloPremenstrualAnterior"
                    name="DiasCicloPremenstrualAnterior"
                    value={formData.DiasCicloPremenstrualAnterior}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Seleccione</option>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Días de sangrado */}
                <div className="mb-4 field-group">
                  <label htmlFor="DiasSangrado" className="block mb-1">
                    ¿Cuántos días de sangrado tuvo?
                  </label>
                  <select
                    id="DiasSangrado"
                    name="DiasSangrado"
                    value={formData.DiasSangrado}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Seleccione</option>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Duración ciclo anterior */}
                <div className="mb-4 field-group">
                  <label
                    htmlFor="DiasDuracionCicloAnteriores"
                    className="block mb-1"
                  >
                    ¿De cuántos días fue el ciclo anterior?
                  </label>
                  <select
                    id="DiasDuracionCicloAnteriores"
                    name="DiasDuracionCicloAnteriores"
                    value={formData.DiasDuracionCicloAnteriores}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Seleccione</option>
                    {Array.from({ length: 46 }, (_, i) => 15 + i).map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Anticonceptivas */}
                <div className="mb-4 field-group">
                  <label htmlFor="Anticonceptivas" className="block mb-1">
                    ¿Toma pastillas anticonceptivas?
                  </label>
                  <select
                    id="Anticonceptivas"
                    name="Anticonceptivas"
                    value={formData.Anticonceptivas}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Seleccione</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>

                {/* Botones */}
                <div className="flex justify-center mt-6 gap-4">
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2 rounded font-semibold"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="btn-primary px-4 py-2 rounded font-semibold"
                  >
                    Volver
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
