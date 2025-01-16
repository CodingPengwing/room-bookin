import RoomsTable from "@/components/react-table/RoomsTable";
import { getAllRooms } from "@/db/rooms";

export default async function RoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div>
      <h1>Rooms Page</h1>
      <RoomsTable rooms={rooms} />
    </div>
  );
}
