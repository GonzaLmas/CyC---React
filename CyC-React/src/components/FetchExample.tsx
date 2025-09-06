import { useEffect, useState } from "react";

const favsArgAccions = [
  "AAPL",
  "AMZN",
  "GOOGL",
  "MELI",
  "META",
  "MSFT",
  "NVDA",
  "TSLA",
  "QQQ",
  "SPY",
];

type AccionData = {
  symbol: string;
  nombre: string;
  c: number;
  pct_change: number;
  hora: string;
};

export default function FetchExample() {
  const [data, setData] = useState<AccionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://data912.com/live/usa_stocks")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener datos");
        return res.json();
      })
      .then((json) => {
        // Filtrar solo las acciones favoritas
        const filtered = json.filter((item: AccionData) =>
          favsArgAccions.includes(item.symbol)
        );
        setData(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Acciones Argentinas Favoritas (ADR)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Ticker</th>
              <th className="px-4 py-2 border-b">Precio</th>
              <th className="px-4 py-2 border-b">Variación (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((accion) => (
              <tr key={accion.symbol} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{accion.nombre}</td>
                <td className="px-4 py-2 border-b">{accion.symbol}</td>
                <td className="px-4 py-2 border-b">${accion.c}</td>
                <td className="px-4 py-2 border-b">{accion.pct_change}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
