import { createClient } from "@supabase/supabase-js";
import type { Database } from "./Supabase";
const supabaseUrl = "https://gxdsdlfqtumczhnjoeja.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
