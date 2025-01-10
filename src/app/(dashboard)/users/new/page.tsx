"use client";
import { startTransition } from "react";
import { createUser } from "@/actions/users";
import { useFormState } from "react-dom";
import { UserRole } from "@prisma/client";

export default function SnippetCreatePage() {
  const [formState, createSnippetAction] = useFormState(
    createUser,
    { errorMessage: "" }
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      createSnippetAction({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as UserRole,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-20" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            className="border rounded p-2 w-full"
            id="name"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-20" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            className="border rounded p-2 w-full"
            id="email"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-20" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            className="border rounded p-2 w-full"
            id="password"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-20" htmlFor="role">
            Role
          </label>
          <input
            name="role"
            className="border rounded p-2 w-full"
            id="role"
          />
        </div>

        {formState.errorMessage && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.errorMessage}
          </div>
        )}

        <button type="submit" className="bg-blue-200 p-2 rounded">
          Create
        </button>
      </div>
    </form>
  );
}
