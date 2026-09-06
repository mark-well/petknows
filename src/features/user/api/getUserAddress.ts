import { supabase } from "../../../../lib/supabase";

export default async function getUserAddress(userId: string | undefined) {
  if (!userId) throw new Error("No user id");
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        province:province_id(name),
        city:city_id(name),
        barangay:barangay_id(name)
        `,
    )
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}
