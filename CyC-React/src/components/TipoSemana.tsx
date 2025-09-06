"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./TipoSemana.css";

const TipoSemana = () => {
  const [competencyDate, setCompetencyDate] = useState("2025-09-22");
  const [selectedWeek, setSelectedWeek] = useState<number | "">("");
  const [dayCapacities, setDayCapacities] = useState<{ [key: number]: string }>(
    {}
  );
  const [dayProperties, setDayProperties] = useState<{ [key: number]: string }>(
    {}
  );

  // Hardcodear capacidades y subcapacidades
  const propiedadesPorCapacidad: { [key: string]: string[] } = {
    Fuerza: [
      "Hipertrofia Tren Superior",
      "Potencia Tren Superior",
      "Máxima Tren Superior",
      "Hipertrofia Tren Inferior",
      "Potencia Tren Inferior",
      "Máxima Tren Inferior",
    ],
    Velocidad: ["Velocidad Máxima", "Resistencia"],
    "Resistencia Aeróbica": ["Intermitente 1", "Intermitente 2"],
    "Resistencia Anaeróbica": [
      "Potencia Aeróbica Alta",
      "Potencia Aeróbica Mixta",
      "Potencia Aeróbica Media",
      "Potencia Aeróbica Baja",
    ],
    Continuo: ["Corto", "Medio", "Largo"],
    Flexibilidad: ["Flexibilidad"],
  };

  const capacidades = Object.keys(propiedadesPorCapacidad);

  const parseDate = (dateString: string) => {
    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(year, month - 1, day);
    } else if (dateString.includes("-")) {
      const [year, month, day] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    throw new Error("Formato de fecha no válido");
  };

  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;

  const handleCapacityChange = (dayNum: number, value: string) => {
    setDayCapacities({ ...dayCapacities, [dayNum]: value });
    setDayProperties({ ...dayProperties, [dayNum]: "" }); // Reset propiedad
  };

  const handlePropertyChange = (dayNum: number, value: string) => {
    setDayProperties({ ...dayProperties, [dayNum]: value });
  };

  const navigate = useNavigate();

  const handleVolver = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // evita que el form haga submit
    navigate("/navbar");
  };

  return (
    <div className="competency-form">
      <div className="form-header">
        <div className="field-group">
          <label htmlFor="competency-date">Fecha de Competencia</label>
          <div className="date-input-wrapper">
            <input
              id="competency-date"
              type="date"
              value={competencyDate}
              onChange={(e) => {
                setCompetencyDate(e.target.value);
                setSelectedWeek("");
              }}
              className="date-input"
            />
            <Calendar className="date-icon" size={20} />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="week-select">Semana</label>
          <div className="select-wrapper">
            <select
              id="week-select"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              disabled={!competencyDate}
              className="select-input"
            >
              <option value="">Seleccione semana</option>
              {Array.from({ length: 13 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Semana {i + 1}
                </option>
              ))}
            </select>
            <ChevronDown className="select-icon" size={20} />
          </div>
        </div>
      </div>

      <div className="days-grid">
        {selectedWeek &&
          Array.from({ length: selectedWeek }, (_, i) => {
            const dayNum = i + 1;
            const fechaDia = new Date(parseDate(competencyDate));
            fechaDia.setDate(fechaDia.getDate() - dayNum); // día -1, -2, etc.

            return (
              <div key={dayNum} className="day-card">
                <h3>
                  Día -{dayNum} | {formatDate(fechaDia)}
                </h3>

                <div className="field-group">
                  <label>Capacidad</label>
                  <div className="select-wrapper">
                    <select
                      value={dayCapacities[dayNum] || ""}
                      onChange={(e) =>
                        handleCapacityChange(dayNum, e.target.value)
                      }
                      className="select-input select-capacidad"
                    >
                      <option value="">Seleccione una capacidad</option>
                      {capacidades.map((cap) => (
                        <option key={cap} value={cap}>
                          {cap}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="select-icon" size={20} />
                  </div>
                </div>

                <div className="field-group">
                  <label>Propiedad</label>
                  <div className="select-wrapper">
                    <select
                      value={dayProperties[dayNum] || ""}
                      onChange={(e) =>
                        handlePropertyChange(dayNum, e.target.value)
                      }
                      className="select-input select-propiedad"
                    >
                      <option value="">Seleccione una subcapacidad</option>
                      {dayCapacities[dayNum] &&
                        propiedadesPorCapacidad[dayCapacities[dayNum]].map(
                          (prop, idx) => (
                            <option key={idx} value={prop}>
                              {prop}
                            </option>
                          )
                        )}
                    </select>
                    <ChevronDown className="select-icon" size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() =>
            console.log({
              competencyDate,
              selectedWeek,
              dayCapacities,
              dayProperties,
            })
          }
          className="btn btn-primary"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={handleVolver}
          className="btn btn-primary"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default TipoSemana;
