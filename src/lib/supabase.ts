import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdhrryjkgypzxknnphol.supabase.co";
const supabaseKey = process.env.PUBLIC_SUPABASE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
