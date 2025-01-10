"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import {
  ActionState,
  CreateBookingInput,
  CreateBookingSchema,
  UpdateBookingInput,
  UpdateBookingSchema,
} from "./types";

export async function createBooking(
  _: ActionState,
  data: CreateBookingInput
): Promise<ActionState> {
  // Check the booking's inputs and make sure they're valid
  const parsedData = CreateBookingSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: JSON.stringify(parsedData.error.errors) };
  }

  // Create a new record in the database
  await db.booking.create({
    data: parsedData.data,
  });

  // Redirect the booking back to the root route
  revalidatePath(`/bookings`);
  return { errorMessage: "" };
  // redirect("/bookings");
}

export async function editBooking(
  _: ActionState,
  data: UpdateBookingInput
): Promise<ActionState> {
  const { id } = data;

  // Check the booking's inputs and make sure they're valid
  const parsedData = UpdateBookingSchema.safeParse(data);

  if (!parsedData.success) {
    return { errorMessage: parsedData.error.errors[0].message };
  }

  await db.booking.update({ where: { id }, data: parsedData.data });
  revalidatePath(`/bookings`);
  redirect("/bookings");
  // return { errorMessage: "" };
}

export async function deleteBooking(id: string) {
  await db.booking.delete({ where: { id } });
  revalidatePath(`/bookings`);
  return { errorMessage: "" };
}
