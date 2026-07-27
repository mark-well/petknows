import { supabase } from "../../lib/supabase";

export const getUserContact = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_contact")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
};
