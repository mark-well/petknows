import { useAuth } from "@/providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import getUserAddress from "../api/getUserAddress";
import getUserProfilePicture from "../api/getUserProfilePicture";

export default function useUser() {
  const { userProfile } = useAuth();

  const { data: profilePicture, isPending: profilePictureLoading } = useQuery({
    queryKey: ["userProfilePic", userProfile?.id],
    queryFn: () => getUserProfilePicture(userProfile?.avatar_url!),
    enabled: Boolean(userProfile?.id),
  });

  const { data: userAddress } = useQuery({
    queryKey: ["userAddress", userProfile?.id],
    queryFn: () => getUserAddress(userProfile?.id),
    enabled: Boolean(userProfile?.id),
  });

  return {
    profilePicture,
    profilePictureLoading,
    userAddress,
  };
}
