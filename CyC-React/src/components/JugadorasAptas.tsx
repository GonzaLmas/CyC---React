import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "./Arrow";
import getJugadorasAptas from "../services/JugadoraService";
import type Jugadora from "../services/JugadoraModel";

// Array de direcciones para las flechas
const directions: ("up" | "right" | "down" | "upRight" | "downRight")[] = [
  "up",
  "right",
  "down",
  "upRight",
  "downRight",
  "up",
];

export default function JugadorasAptas() {
  type JugadoraConNull = {
    [K in keyof Jugadora]: Jugadora[K] | null;
  };

  const [jugadoras, setJugadoras] = useState<JugadoraConNull[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarJugadoras = async () => {
      try {
        const data = await getJugadorasAptas();
        console.log("data", data);
        setJugadoras(data);
      } catch (err) {
        console.error("Error al cargar las jugadoras:", err);
        setError(
          "Error al cargar las jugadoras. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    cargarJugadoras();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/navbar");
  };
  const renderContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center">
            Cargando jugadoras...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (jugadoras.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-4 text-center">
            No hay jugadoras disponibles
          </td>
        </tr>
      );
    }

    return jugadoras.map((jugadora, index) => (
      <tr key={jugadora.IdJugadora || index} className="hover:bg-gray-800">
        <td className="px-6 py-4 whitespace-nowrap">
          {jugadora.Nombre || "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {jugadora.Apellido || "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {jugadora.Edad ? `${jugadora.Edad} años` : "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {jugadora.Division || "-"}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-indigo-500 cursor-pointer hover:underline flex items-center gap-1">
          <Arrow direction={directions[index % directions.length]} />
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Jugadoras Disponibles</h2>
          <p className="text-gray-400 text-sm">
            Lista de jugadoras aptas para entrenar
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Apellido
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Edad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                División
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rendimiento
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">{renderContent()}</tbody>
        </table>

        <div className="mt-4">
          <button
            onClick={handleClick}
            className="cursor-pointer rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
