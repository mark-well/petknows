import { supabase } from "../../../../lib/supabase";

export default async function deleteImage(bucket: string, url: string[]) {
  if (!bucket) throw new Error("No bucket specified");
  if (url.length === 0) throw new Error("No url specified");

  const { data, error } = await supabase.storage.from(bucket).remove(url);
  if (error) throw error;
  return data;
}
