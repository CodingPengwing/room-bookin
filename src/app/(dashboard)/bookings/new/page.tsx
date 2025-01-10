import { Room, User } from "@prisma/client";
import db from "@/db";
import BookingCreateForm from "@/components/forms/BookingCreateForm";

export default async function BookingCreatePage() {
  const users: User[] = await db.user.findMany();
  // Find list of all rooms and their booked data
  const roomsWithBookings = await db.room.findMany({
    include: {
      bookings: true,
    },
  });
  return (
    <BookingCreateForm users={users} roomsWithBookings={roomsWithBookings} />
  );
}
