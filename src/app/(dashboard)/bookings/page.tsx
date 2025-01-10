import BookingsTable from "@/components/react-table/BookingsTable";
import { Booking } from "@prisma/client";

export default async function BookingsPage() {
  const bookings: Booking[] = [
    {
      id: "b1d21f00-3e5d-4e5c-9427-2c9235c7d2a1",
      date: new Date("2025-01-12T10:00:00Z"),
      roomId: "room-101",
      userId: "user-1001",
      createdAt: new Date("2025-01-10T08:30:00Z"),
    },
    {
      id: "d2f4b110-9e7e-4c4e-8d62-7a9c57c9a9c4",
      date: new Date("2025-01-13T14:30:00Z"),
      roomId: "room-102",
      userId: "user-1002",
      createdAt: new Date("2025-01-10T09:00:00Z"),
    },
    {
      id: "a3e78c21-8d3f-456b-91f4-ec3f8d8e3a7c",
      date: new Date("2025-01-14T16:00:00Z"),
      roomId: "room-103",
      userId: "user-1003",
      createdAt: new Date("2025-01-11T11:45:00Z"),
    },
    {
      id: "f4e56c12-9e6a-40c5-b4e3-6e2e67d3a4b5",
      date: new Date("2025-01-15T09:00:00Z"),
      roomId: "room-104",
      userId: "user-1004",
      createdAt: new Date("2025-01-12T15:30:00Z"),
    },
    {
      id: "b5d67f22-4e7f-4895-9617-5c3b87d5e4c6",
      date: new Date("2025-01-16T11:30:00Z"),
      roomId: "room-105",
      userId: "user-1005",
      createdAt: new Date("2025-01-13T17:00:00Z"),
    },
    {
      id: "b1d21f00-3e5d-4e5c-9427-2c9235c7d2a1",
      date: new Date("2025-01-12T10:00:00Z"),
      roomId: "room-101",
      userId: "user-1001",
      createdAt: new Date("2025-01-10T08:30:00Z"),
    },
    {
      id: "d2f4b110-9e7e-4c4e-8d62-7a9c57c9a9c4",
      date: new Date("2025-01-13T14:30:00Z"),
      roomId: "room-102",
      userId: "user-1002",
      createdAt: new Date("2025-01-10T09:00:00Z"),
    },
    {
      id: "a3e78c21-8d3f-456b-91f4-ec3f8d8e3a7c",
      date: new Date("2025-01-14T16:00:00Z"),
      roomId: "room-103",
      userId: "user-1003",
      createdAt: new Date("2025-01-11T11:45:00Z"),
    },
    {
      id: "f4e56c12-9e6a-40c5-b4e3-6e2e67d3a4b5",
      date: new Date("2025-01-15T09:00:00Z"),
      roomId: "room-104",
      userId: "user-1004",
      createdAt: new Date("2025-01-12T15:30:00Z"),
    },
    {
      id: "b5d67f22-4e7f-4895-9617-5c3b87d5e4c6",
      date: new Date("2025-01-16T11:30:00Z"),
      roomId: "room-105",
      userId: "user-1005",
      createdAt: new Date("2025-01-13T17:00:00Z"),
    },
  ];

  return (
    <div>
      <h1>Bookings Page</h1>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
