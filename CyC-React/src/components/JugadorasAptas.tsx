import Arrow from "./Arrow";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const users = [
  { name: "Melanie", surname: "Gonzalez", age: "18", club: "Huracán" },
  { name: "Maria", surname: "Solano", age: "17", club: "Huracán" },
  { name: "Camila", surname: "Cutuli", age: "16", club: "Huracán" },
  { name: "Fiorella", surname: "Espinoza", age: "18", club: "Huracán" },
  { name: "Leila", surname: "Eroles", age: "19", club: "Huracán" },
  { name: "Ariana", surname: "Mon", age: "16", club: "Huracán" },
];

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
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // evita que el form haga submit
    navigate("/navbar");
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
                Club
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Rendimiento
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  {user.surname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  {user.club}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-indigo-500 cursor-pointer hover:underline flex items-center gap-1">
                  <Arrow direction={directions[idx % directions.length]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button
            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClick}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
