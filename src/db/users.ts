import { db } from "@/db";

export async function getAllUsers(sortByCreation: boolean = true) {
  try {
    return db.user.findMany({
      orderBy: sortByCreation ? { createdAt: "desc" } : {},
    });
  } catch (error) {
    console.log(error);
    throw new Error("Users not found");
  }
}

export async function getUserById(id: string) {
  try {
    return db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
}

export async function getUserByEmail(email: string) {
  try {
    return db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
}
