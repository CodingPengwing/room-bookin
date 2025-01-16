import db from "@/db";

export async function getAllBookings() {
  try {
    return db.booking.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.log(error);
    throw new Error("Bookings not found");
  }
}
