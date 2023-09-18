import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = "https://mbxgvfscdghfnvxpfyqi.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
