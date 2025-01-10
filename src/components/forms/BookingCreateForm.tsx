"use client";

import { startTransition } from "react";
import { createBooking } from "@/actions/bookings";
import { useFormState } from "react-dom";
import { Booking, Room, User } from "@prisma/client";

interface BookingCreateFormProps {
  users: User[];
  roomsWithBookings: (Room & { bookings: Booking[] })[];
  onSubmit?: () => void;
}

export default function BookingCreateForm({
  users,
  roomsWithBookings: rooms,
  onSubmit,
}: BookingCreateFormProps) {
  const [formState, createBookingAction] = useFormState(createBooking, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      createBookingAction({
        date: new Date(formData.get("date") as string),
        userId: formData.get("userId") as string,
        roomId: formData.get("roomId") as string,
      });
    });
    onSubmit?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow rounded"
    >
      <h1 className="font-bold mb-6 text-2xl text-center text-gray-700">
        Create a Booking
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
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        {/* Prettified Section */}

        {formState.errorMessage && (
          <div className="p-3 bg-red-100 border rounded border-red-400 text-red-700 text-sm">
            {formState.errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow"
        >
          Create
        </button>
      </div>
    </form>
  );
}
