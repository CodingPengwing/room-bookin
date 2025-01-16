import db from "@/db";

export async function getAllBookings(sortByCreation: boolean = true) {
  try {
    return db.booking.findMany({
      orderBy: sortByCreation ? { createdAt: "desc" } : {},
    });
  } catch (error) {
    console.log(error);
    throw new Error("Bookings not found");
  }
}
