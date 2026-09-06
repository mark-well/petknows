import { supabase } from "../../../lib/supabase";

export default async function getBarangay(cityId: string) {
  const { data, error } = await supabase.from("address_barangay").select().eq("city_id", cityId);

  if (error) throw error;
  return data;
}
