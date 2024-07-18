import { getServerSession } from "next-auth";

export const isAdmin = async () => {
  const session = await getServerSession();
  if (!session) throw new Error("You must be logged in");

  if (session.user?.email !== process.env.ADMIN_EMAIL) {
    throw new Error("You don't have the permission to make this action");
  }
};
