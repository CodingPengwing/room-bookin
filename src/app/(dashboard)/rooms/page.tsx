import RoomsTable from "@/components/react-table/RoomsTable";
import db from "@/db";
import { Room } from "@prisma/client";

export default async function RoomsPage() {
  const rooms: Room[] = await db.room.findMany();

  return (
    <div>
      <h1>Rooms Page</h1>
      <RoomsTable rooms={rooms} />
    </div>
  );
}
