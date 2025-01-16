import { db } from "@/db";

export async function getAllRooms() {
  try {
    return db.room.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.log(error);
    throw new Error("Rooms not found");
  }
}

export async function getAllRoomsWithBookings() {
  try {
    return db.room.findMany({
      include: { bookings: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Unable to fetch rooms with bookings");
  }
}
