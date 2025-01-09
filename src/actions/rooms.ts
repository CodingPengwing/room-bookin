"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import {
  ActionState,
  CreateRoomInput,
  CreateRoomSchema,
  UpdateRoomInput,
  UpdateRoomSchema,
} from "./types";

export async function createRoom(
  _: ActionState,
  data: CreateRoomInput
): Promise<ActionState> {
  // Check the room's inputs and make sure they're valid
  const parsedData = CreateRoomSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: JSON.stringify(parsedData.error.errors) };
  }

  // Create a new record in the database
  await db.room.create({
    data: parsedData.data,
  });

  // Redirect the room back to the root route
  revalidatePath(`/rooms`);
  redirect("/rooms");
}

export async function editRoom(
  _: ActionState,
  data: UpdateRoomInput
): Promise<ActionState> {
  const { id } = data;

  // Check the room's inputs and make sure they're valid
  const parsedData = UpdateRoomSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: parsedData.error.errors[0].message };
  }

  await db.room.update({ where: { id }, data: parsedData.data });
  revalidatePath(`/rooms`);
  redirect(`/rooms`);
}

export async function deleteRoom(id: string) {
  await db.room.delete({ where: { id } });
  revalidatePath(`/rooms`);
  redirect(`/rooms`);
}
