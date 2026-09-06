import { supabase } from "../../../../lib/supabase";

export default async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();

  if (!error) {
    return data;
  } else {
    return undefined;
  }
}
