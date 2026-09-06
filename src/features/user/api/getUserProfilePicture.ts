import { supabase } from "../../../../lib/supabase";

export default function getUserProfilePicture(url: string) {
  const { data } = supabase.storage.from("user_avatars").getPublicUrl(url);

  return data;
}
