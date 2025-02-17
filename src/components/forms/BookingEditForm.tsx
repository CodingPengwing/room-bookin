"use client";

import { startTransition, useMemo } from "react";
import { editBooking } from "@/actions/bookings";
import { useFormState } from "react-dom";
import { Booking, Room, User } from "@prisma/client";
import React from "react";

interface BookingEditFormProps {
  booking: Booking;
  users: User[];
  roomsWithBookings: (Room & { bookings: Booking[] })[];
  onSubmit?: () => void;
}

export default function BookingEditForm({
  booking,
  users,
  roomsWithBookings,
  onSubmit,
}: BookingEditFormProps) {
  const [formState, editBookingAction] = useFormState(editBooking, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      editBookingAction({
        id: booking.id,
        date: new Date(formData.get("date") as string),
        userId: formData.get("userId") as string,
        roomId: formData.get("roomId") as string,
      });
    });
    onSubmit?.();
  }

  const [chosenDate, setChosenDate] = React.useState<Date>(booking.date);
  const [chosenUserId, setChosenUserId] = React.useState<string>(
    booking.userId
  );
  const [chosenRoomId, setChosenRoomId] = React.useState<string>(
    booking.roomId
  );

  const roomsAvailable = useMemo(
    () =>
      roomsWithBookings
        // Filter out rooms that have bookings on chosen date
        .filter((room) => {
          const bookingsOnDate = room.bookings.filter(
            (booking) =>
              new Date(booking.date).toISOString().split("T")[0] ===
              chosenDate.toISOString().split("T")[0]
          );
          const isCurrentBooking = booking.roomId === room.id;
          return isCurrentBooking || bookingsOnDate.length === 0;
        }),
    [roomsWithBookings, chosenDate]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow rounded"
    >
      <h1 className="font-bold mb-6 text-2xl text-center text-gray-700">
        Edit current Booking
      </h1>
      <div className="space-y-6">
        {/* Prettified Section */}
        <div className="flex flex-col">
          <label htmlFor="date" className="text-gray-700 font-medium">
            Choose a Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="border rounded p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={chosenDate.toISOString().split("T")[0]}
            onChange={(event) => setChosenDate(new Date(event.target.value))}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="userId" className="text-gray-700 font-medium">
            Choose a User
          </label>
          <select
            id="userId"
            name="userId"
            className="border rounded p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={chosenUserId}
            onChange={(event) => setChosenUserId(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="roomId" className="text-gray-700 font-medium">
            Choose a Room
          </label>
          <select
            id="roomId"
            name="roomId"
            className="border rounded p-3 mt-1 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={chosenRoomId}
            onChange={(event) => setChosenRoomId(event.target.value)}
          >
            {roomsAvailable.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          {roomsAvailable.length === 0 && (
            <p className="text-red-500 text-sm">
              No rooms available on chosen date
            </p>
          )}
        </div>

        {formState.errorMessage && (
          <div className="p-3 bg-red-100 border rounded border-red-400 text-red-700 text-sm">
            {formState.errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
        >
          Save
        </button>
      </div>
    </form>
  );
}
