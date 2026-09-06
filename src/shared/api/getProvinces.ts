import { supabase } from "../../../lib/supabase";

export default async function getProvinces() {
  const { data, error } = await supabase.from("address_province").select();

  if (error) throw error;
  return data;
}
