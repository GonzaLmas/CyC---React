import { useState } from "react";

export default function RegistroUsuario() {
  const [form, setForm] = useState({
    email: "",
    pass: "",
    confirmarPass: "",
    rol: "",
    nombre: "",
    apellido: "",
    club: "",
  });

  const [errorPass, setErrorPass] = useState("");
  const [mensaje, setMensaje] = useState("");

  const roles = [
    { value: "1", text: "Administrador" },
    { value: "2", text: "Usuario" },
    { value: "3", text: "Club" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleConfirmPassBlur = () => {
    if (form.pass !== form.confirmarPass) {
      setErrorPass("Las contraseñas no coinciden.");
    } else {
      setErrorPass("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.pass !== form.confirmarPass) {
      setErrorPass("Las contraseñas no coinciden.");
      return;
    }

    setErrorPass("");

    fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el registro");
        return res.json();
      })
      .then(() => {
        setMensaje("Usuario registrado correctamente.");
      })
      .catch((err) => setMensaje(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-neutral-900 shadow-lg rounded-2xl">
        <div className="text-center py-4 rounded-t-2xl">
          <h3 className="text-xl font-bold text-white">Registro de Usuario</h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                placeholder="Ingrese su correo electrónico"
              />
            </div>

            <div className="field-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="pass"
                value={form.pass}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                placeholder="Ingrese su contraseña"
              />
            </div>

            <div className="field-group">
              <label>Confirmar Contraseña</label>
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
              <label>Elija un rol</label>
              <select
                name="rol"
                value={form.rol}
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

            {form.rol === "3" && (
              <div className="field-group" id="clubDiv">
                <label>Club</label>
                <input
                  type="text"
                  name="club"
                  value={form.club}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                  placeholder="Ingrese su club"
                />
              </div>
            )}

            <div className="field-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                placeholder="Ingrese su nombre"
              />
            </div>

            <div className="field-group">
              <label>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-transparent text-white focus:ring"
                placeholder="Ingrese su apellido"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg btn-primary"
            >
              Registrarse
            </button>

            {mensaje && (
              <div className="mt-3 p-2 bg-red-100 text-red-600 rounded-lg">
                {mensaje}
              </div>
            )}
          </form>

          <p className="mt-4 text-center text-sm">
            Ingresar{" "}
            <a href="/login" className="iniciarSesion hover:underline">
              Iniciar Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
