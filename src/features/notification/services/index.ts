import { supabase } from "../../../../lib/supabase";

// Insert a notificaiton record to supabase
export async function notifyOwner(recipientId: string | null, senderId: string | null, pet: any | null) {
  if (!recipientId) throw new Error("No recipient id provided.");
  if (!senderId) throw new Error("No sender id provided.");
  if (!pet) throw new Error("No pet id provided.");

  const { error } = await supabase.from("notifications").insert({
    recipient_id: recipientId,
    sender_id: senderId,
    type: "identify-pet",
    title: "Your pet might have been identified!",
    message: `Someone have identified your pet ${pet.name}. If your pet is missing you might want to reach out to the person who identified your pet.`,
  });

  if (error) throw error;
}

// Get all the notification of a user
export async function getUserNotifications(userId: string | null) {
  if (!userId) throw new Error("Failed to get notifications. No user id.");
  const { data, error } = await supabase.from("notifications").select("*").eq("recipient_id", userId);

  if (error) throw error;
  return data;
}

export async function getUserNotificationsCount(userId: string | null) {
  if (!userId) throw new Error("Failed to get notifications count. No user id.");
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false)
    .eq("recipient_id", userId);

  if (error) throw error;
  return count;
}
