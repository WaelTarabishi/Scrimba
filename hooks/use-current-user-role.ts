import { useSession } from "next-auth/react";

export const useCurrentUserRole = () => {
  const session = useSession();
  return session.data?.user.role;
};
