import { useState, type ChangeEvent, type FormEvent } from "react";

interface FormData {
  VariableE: string;
}

export default function FormPercepcionEsfuerzo() {
  const [formData, setFormData] = useState<FormData>({ VariableE: "" });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Aquí iría la llamada a tu API para enviar los datos
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {/* Cabecera */}
            <div
              className="text-white text-center p-4"
              style={{ backgroundColor: "#242424" }}
            >
              <h3 className="text-lg font-semibold">Complete el Formulario</h3>
            </div>

            {/* Formulario */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Variable E */}
                <div className="mb-4 field-group">
                  <label htmlFor="VariableE" className="block mb-1">
                    ¿Cuánto esfuerzo realizó en el último entrenamiento?
                  </label>
                  <select
                    id="VariableE"
                    name="VariableE"
                    value={formData.VariableE}
                    onChange={handleChange}
                    className="select-input"
                  >
                    <option value="">Seleccione</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
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
