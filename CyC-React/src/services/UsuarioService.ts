import supabase from "./SupabaseService";
import { encryptPassword, encryptPasswordWithSalt } from "../utils/cryptoUtils";

export interface Usuario {
  Email: string;
  Pass: string;
  IdRol: number;
  Nombre: string;
  Apellido: string;
  Salt?: string | null;
  IdUsuario?: string;
}

export async function crearUsuario(
  usuario: Omit<Usuario, "IdUsuario" | "Salt">
) {
  try {
    console.log("=== INICIANDO CREACIÓN DE USUARIO ===");
    console.log("Datos recibidos:", usuario);

    // Verificar conexión a Supabase
    const { data: testConnection } = await supabase
      .from("Usuario")
      .select("count")
      .limit(1);
    console.log("Conexión a Supabase OK:", testConnection);

    if (
      !usuario.Email ||
      !usuario.Pass ||
      !usuario.IdRol ||
      !usuario.Nombre ||
      !usuario.Apellido
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const { hashedPassword, salt } = await encryptPassword(usuario.Pass);

    const userData = {
      Email: usuario.Email,
      Pass: hashedPassword,
      IdRol: usuario.IdRol,
      Nombre: usuario.Nombre,
      Apellido: usuario.Apellido,
      Salt: salt,
    };

    console.log("=== INTENTANDO INSERT ===");
    console.log("Datos a insertar:", userData);

    // // Verificar que el IdRol existe
    // const { data: rolExists } = await supabase
    //   .from("UsuarioRol")
    //   .select("*")
    //   .eq("IdRol", usuario.IdRol);
    // console.log("Rol encontrado:", rolExists);

    const { data, error } = await supabase
      .from("Usuario")
      .insert([userData])
      .select();

    console.log("=== RESULTADO INSERT ===");
    console.log("Data:", data);
    console.log("Error completo:", error);

    if (error) {
      // Log más detallado del error
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("=== ERROR CAPTURADO ===", error);
    throw error;
  }
}

export async function verificarCredenciales(
  email: string,
  password: string
): Promise<Usuario | null> {
  try {
    const { data: usuarios, error } = await supabase
      .from("Usuario")
      .select("*")
      .eq("Email", email)
      .limit(1);

    if (error) {
      console.error("Error al verificar credenciales:", error);
      throw error;
    }

    if (!usuarios || usuarios.length === 0) {
      return null;
    }

    const usuario = usuarios[0];

    const hashedPassword = await encryptPasswordWithSalt(
      password,
      usuario.Salt || ""
    );

    if (hashedPassword === usuario.Pass) {
      // No devolver la contraseña hasheada ni el salt
      const { Pass, Salt, ...usuarioSinDatosSensibles } = usuario;
      return usuarioSinDatosSensibles as Usuario;
    }

    return null;
  } catch (error) {
    console.error("Error en verificarCredenciales:", error);
    throw error;
  }
}

export async function getUsuarios() {
  const { data, error } = await supabase.from("Usuario").select("*");

  if (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }

  return data;
}
