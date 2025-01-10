import BookingsTable from "@/components/react-table/BookingsTable";
import db from "@/db";
import { Booking } from "@prisma/client";

export default async function BookingsPage() {
  const bookings: Booking[] = await db.booking.findMany();
  const users = await db.user.findMany();
  const roomsWithBookings = await db.room.findMany({
    include: {
      bookings: true,
    },
  });

  return (
    <div>
      <h1>Bookings Page</h1>
      <BookingsTable
        bookings={bookings}
        users={users}
        roomsWithBookings={roomsWithBookings}
      />
    </div>
  );
}
