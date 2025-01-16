import BookingsTable from "@/components/react-table/BookingsTable";
import { getAllBookings } from "@/db/bookings";
import { getAllRoomsWithBookings } from "@/db/rooms";
import { getAllUsers } from "@/db/users";

export default async function BookingsPage() {
  const bookings = await getAllBookings();
  const users = await getAllUsers();
  const roomsWithBookings = await getAllRoomsWithBookings();

  return (
    <div>
      <BookingsTable
        bookings={bookings}
        users={users}
        roomsWithBookings={roomsWithBookings}
      />
    </div>
  );
}
