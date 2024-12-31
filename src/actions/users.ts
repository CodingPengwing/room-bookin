"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { Prisma, User } from "@prisma/client";
import { ActionState, CreateUserSchema, UserSchema } from "./types";

export type CreateUserData = Pick<User, "name" | "email" | "password" | "role">;

export type UpdateUserData = Pick<User, "id"> &
  Partial<Pick<User, "name" | "email" | "password" | "role">>;

export async function createUser(
  _: ActionState,
  data: CreateUserData
): Promise<ActionState> {
  // Check the user's inputs and make sure they're valid
  const { name, email, password, role } = data;

  try {
    CreateUserSchema.parse(data); // Validates the object
  } catch (error: any) {
    return { errorMessage: error.errors[0] }; // Outputs validation errors
  }

  // Create a new record in the database
  await db.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  // Redirect the user back to the root route
  revalidatePath(`/`);
  redirect("/");
}

export async function editUser(
  _: ActionState,
  data: UpdateUserData
): Promise<ActionState> {
  // Check the user's inputs and make sure they're valid
  const { id, name, email, password, role } = data;

  const newState = validateUserData(data);
  if (newState?.errorMessage) {
    return newState;
  }

  await db.user.update({ where: { id }, data });
  revalidatePath(`/users/${id}`);
  redirect(`/users/${id}`);
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });
  revalidatePath(`/`);
  redirect(`/`);
}
