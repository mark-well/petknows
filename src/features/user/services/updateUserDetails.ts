import { supabase } from "../../../../lib/supabase";
import type { UpdateUserRecord } from "../types";

export default async function updateUserDetails(userId: string, update: UpdateUserRecord) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: update.first_name,
      last_name: update.last_name,
      birth_date: update.birth_date,
      email: update.email,
      contact_number: update.contact_number,
      sex: update.sex,
    })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
}
