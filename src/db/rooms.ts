import { db } from "@/db";

export async function getAllRooms(sortByCreation: boolean = true) {
  try {
    return db.room.findMany({
      orderBy: sortByCreation ? { createdAt: "desc" } : {},
    });
  } catch (error) {
    console.log(error);
    throw new Error("Rooms not found");
  }
}

export async function getAllRoomsWithBookings(sortByCreation: boolean = true) {
  try {
    return db.room.findMany({
      include: { bookings: true },
      orderBy: sortByCreation ? { createdAt: "desc" } : {},
    });
  } catch (error) {
    console.log(error);
    throw new Error("Unable to fetch rooms with bookings");
  }
}
