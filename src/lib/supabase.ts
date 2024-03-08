import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdhrryjkgypzxknnphol.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY!;
// export const supabase = createClient(supabaseUrl, supabaseKey);
// uncomment above to get real data, some reason supabase stopped
// working but was working earlier. Probably a limit from the free tier.
