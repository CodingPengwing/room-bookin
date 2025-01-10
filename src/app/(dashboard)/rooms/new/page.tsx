"use client";

import { startTransition } from "react";
import { createRoom } from "@/actions/rooms";
import { useFormState } from "react-dom";

export default function RoomCreatePage() {
  const [formState, createRoomAction] = useFormState(createRoom, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      createRoomAction({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold m-3 text-2xl">Create a Room</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-20" htmlFor="name">
            Name
          </label>
          <input name="name" className="border rounded p-2 w-full" id="name" />
        </div>

        <div className="flex gap-4">
          <label className="w-20" htmlFor="Description">
            Description
          </label>
          <textarea
            name="description"
            className="border rounded p-2 w-full"
            id="description"
          />
        </div>

        {formState.errorMessage && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.errorMessage}
          </div>
        )}

        <button type="submit" className="bg-blue-200  p-2 border rounded mt-4">
          Create
        </button>
      </div>
    </form>
  );
}
