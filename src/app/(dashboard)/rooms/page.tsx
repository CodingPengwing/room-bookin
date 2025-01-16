import RoomsTable from "@/components/react-table/RoomsTable";
import { getAllRooms } from "@/db/rooms";

export default async function RoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div>
      <RoomsTable rooms={rooms} />
    </div>
  );
}
