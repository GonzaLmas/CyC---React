import supabase from "./SupabaseService";

async function getJugadorasAptas() {
  const { data, error } = await supabase.from("Jugadora").select("*");
  if (error) throw error;
  return data;
}

export default getJugadorasAptas;
