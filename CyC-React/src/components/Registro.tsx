import { useState } from "react";
import { crearUsuario } from "../services/UsuarioService";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    Email: "",
    Pass: "",
    confirmarPass: "",
    IdRol: 0,
    Nombre: "",
    Apellido: "",
  });

  const [errorPass, setErrorPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  const roles = [
    { value: "f211f07c-4004-4575-9dbc-af8dbbf3f8d0", text: "Admin" },
    { value: "d4bead2c-64ec-4f82-8491-fcd62158dd08", text: "PF" },
    { value: "3756bc44-caf3-4efc-8b55-aa2ace5be1b8", text: "Jugadora" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleConfirmPassBlur = () => {
    if (form.Pass !== form.confirmarPass) {
      setErrorPass("Las contraseñas no coinciden.");
    } else {
      setErrorPass("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.Pass !== form.confirmarPass) {
      setErrorPass("Las contraseñas no coinciden.");
      return;
    }

    if (form.IdRol === 0) {
      setMensaje("Por favor selecciona un rol");
      return;
    }

    setErrorPass("");
    setMensaje("");

    try {
      await crearUsuario({
        Email: form.Email,
        Pass: form.Pass,
        IdRol: form.IdRol,
        Nombre: form.Nombre,
        Apellido: form.Apellido,
      });

      setMensaje("Usuario registrado correctamente.");

      setForm({
        Email: "",
        Pass: "",
        confirmarPass: "",
        IdRol: 0,
        Nombre: "",
        Apellido: "",
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensaje(
        error instanceof Error ? error.message : "Error al registrar el usuario"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-neutral-900 shadow-lg rounded-2xl p-6">
        <div className="text-center py-4 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">Registro de Usuario</h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="field-group">
            <label className="text-white">Email</label>
            <input
              type="email"
              name="Email"
              value={form.Email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
              placeholder="Ingrese su correo electrónico"
            />
          </div>

          <div className="field-group">
            <label className="text-white">Contraseña</label>
            <input
              type="password"
              name="Pass"
              value={form.Pass}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
              placeholder="Ingrese su contraseña"
            />
          </div>

          <div className="field-group">
            <label className="text-white">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmarPass"
              value={form.confirmarPass}
              onChange={handleChange}
              onBlur={handleConfirmPassBlur}
              required
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
              placeholder="Confirme su contraseña"
            />
            {errorPass && <p className="text-red-400 text-sm">{errorPass}</p>}
          </div>

          <div className="field-group">
            <label className="text-white">Rol</label>
            <select
              name="IdRol"
              value={form.IdRol}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
            >
              <option value="">Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.value} value={rol.value}>
                  {rol.text}
                </option>
              ))}
            </select>
          </div>

          {/* 
          {form.IdRol === 3 && (
            <div className="field-group" id="clubDiv">
              <label className="text-white">Club</label>
              <input
                type="text"
                name="Club"
                value={form.Club}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                placeholder="Ingrese el nombre del club (opcional)"
              />
            </div>
          )} */}

          <div className="field-group">
            <label className="text-white">Nombre</label>
            <input
              type="text"
              name="Nombre"
              value={form.Nombre}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
              placeholder="Ingrese su nombre"
            />
          </div>

          <div className="field-group">
            <label className="text-white">Apellido</label>
            <input
              type="text"
              name="Apellido"
              value={form.Apellido}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
              placeholder="Ingrese su apellido"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Registrarse
          </button>

          {mensaje && (
            <div
              className={`mt-3 p-2 rounded-lg text-center ${
                mensaje.includes("correctamente")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {mensaje}
            </div>
          )}
        </form>

        <p className="mt-4 text-center text-sm text-white">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
