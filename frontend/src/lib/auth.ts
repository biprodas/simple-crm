import { authSession } from "~/auth";

export const currentUser = async () => {
  const session = await authSession();

  return session?.user;
};