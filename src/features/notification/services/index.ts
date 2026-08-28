import { supabase } from "../../../../lib/supabase";

export async function NotifyOwner(recipientId: string | null, senderId: string | null, pet: any | null) {
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
