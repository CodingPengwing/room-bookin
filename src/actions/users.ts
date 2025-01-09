"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { ActionState, CreateUserInput, CreateUserSchema, UpdateUserInput, UpdateUserSchema } from "./types";

export async function createUser(
  _: ActionState,
  data: CreateUserInput
): Promise<ActionState> {
  // Check the user's inputs and make sure they're valid
  const parsedData = CreateUserSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: JSON.stringify (parsedData.error.errors) };
  }

  // Create a new record in the database
  await db.user.create({
    data: parsedData.data,
  });

  // Redirect the user back to the root route
  revalidatePath(`/users`);
  redirect("/users");
}

export async function editUser(
  _: ActionState,
  data: UpdateUserInput
): Promise<ActionState> {
  const { id } = data;

  // Check the user's inputs and make sure they're valid
  const parsedData = UpdateUserSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: parsedData.error.errors[0].message };
  }

  await db.user.update({ where: { id }, data: parsedData.data });
  revalidatePath(`/users/${id}`);
  redirect(`/users/${id}`);
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });
  revalidatePath(`/users`);
  redirect(`/users`);
}