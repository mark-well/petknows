import { supabase } from "../../../lib/supabase";

export default async function getCities(provinceId: string) {
  const { data, error } = await supabase.from("address_city").select().eq("province_id", provinceId);

  if (error) throw error;
  return data;
}
