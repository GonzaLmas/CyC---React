import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Competencia = () => {
  const fechas = ["2025-09-09", "2025-09-08", "2025-09-07"];

  // Datos de ejemplo por día
  const capacidades = ["Resistencia Aeróbica", "Velocidad", "Fuerza"];
  const propiedadesPorCapacidad = {
    "Resistencia Aeróbica": ["Intermitente 1", "Intermitente 2"],
    Velocidad: ["Velocidad Máxima", "Velocidad Media"],
    Fuerza: ["Fuerza Máxima", "Fuerza Resistencia"],
  };

  const [fechaCompetencia, setFechaCompetencia] = useState("");
  const [selectedWeek, _setSelectedWeek] = useState(3); // ejemplo
  const [dayCapacities, setDayCapacities] = useState({});
  const [dayProperties, setDayProperties] = useState({});

  const handleChange = (e) => {
    setFechaCompetencia(e.target.value);
  };

  const handleCapacityChange = (day, value) => {
    setDayCapacities({ ...dayCapacities, [day]: value });
    setDayProperties({ ...dayProperties, [day]: "" }); // reset subcapacidad
  };

  const handlePropertyChange = (day, value) => {
    setDayProperties({ ...dayProperties, [day]: value });
  };

  const navigate = useNavigate();

  const handleVolver = (e) => {
    e.preventDefault();
    navigate("/navbar");
  };

  const parseDate = (str) => new Date(str);
  const formatDate = (date) =>
    date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="competency-form">
      <div className="field-group">
        <label htmlFor="fechaCompetencia">
          Seleccione una fecha de competencia:
        </label>
        <select
          id="fechaCompetencia"
          value={fechaCompetencia}
          onChange={handleChange}
          className="select-input"
        >
          {!fechaCompetencia && <option value="">Seleccione una fecha</option>}
          {fechas.map((fecha, index) => (
            <option key={index} value={fecha}>
              {formatDate(new Date(fecha))}
            </option>
          ))}
        </select>

        <div className="days-grid mt-4">
          {fechaCompetencia &&
            Array.from({ length: selectedWeek }, (_, i) => {
              const dayNum = i + 1;
              const fechaDia = new Date(parseDate(fechaCompetencia));
              fechaDia.setDate(fechaDia.getDate() - dayNum);

              return (
                <div key={dayNum} className="day-card">
                  <h3>
                    Día -{dayNum} | {formatDate(fechaDia)}
                  </h3>

                  <div className="field-group">
                    <label>Capacidad</label>
                    <p>{dayCapacities[dayNum] || "No asignado"}</p>
                  </div>

                  <div className="field-group">
                    <label>Propiedad</label>
                    <p>
                      {dayCapacities[dayNum] && dayProperties[dayNum]
                        ? dayProperties[dayNum]
                        : "No asignado"}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleVolver}
            className="btn btn-primary"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Competencia;
