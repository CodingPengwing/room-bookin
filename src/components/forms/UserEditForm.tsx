"use client";

import { startTransition } from "react";
import { editUser } from "@/actions/users";
import { useFormState } from "react-dom";
import { User, UserRole, UserStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { useCallback } from "react";
import { openSnackbar } from "@/components/state/snackbar";
import { SnackbarProps } from "@/components/types/snackbar";
import Snackbar from "../@extended/Snackbar";

interface UserEditFormProps {
  user: User;
  onSubmit?: () => void;
}

export default function UserEditForm({ user, onSubmit }: UserEditFormProps) {
  const router = useRouter();

  const [formState, editUserAction] = useFormState(editUser, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      id: user.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as UserRole,
    });
    startTransition(() => {
      editUserAction({
        id: user.id,
        email: formData.get("email") as string,
        role: formData.get("role") as UserRole,
        status: formData.get("status") as UserStatus,
      });
    });
    onSubmit?.();

    openSnackbar({
      open: true,
      message: "Successfuly updated user.",
      variant: "alert",
      alert: {
        color: "success",
      },
    } as SnackbarProps);

    setTimeout(() => {
      router.push(`/users/${user.id}`);
    }, 1500);
  }

  return (
    <div>
      <Snackbar />
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{user.name}</h1>
        </div>
        <form className="m-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="id" className="font-semibold text-gray-700">
              ID:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              defaultValue={user.id}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="createdAt" className="font-semibold text-gray-700">
              Created At:
            </label>
            <input
              type="text"
              id="createdAt"
              name="createdAt"
              defaultValue={user.createdAt.toISOString()}
              readOnly
              className="border p-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="font-semibold text-gray-700">
              Role:
            </label>
            <input
              type="text"
              id="role"
              name="role"
              defaultValue={user.role}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="status" className="font-semibold text-gray-700">
              Status:
            </label>
            <input
              type="text"
              id="status"
              name="status"
              defaultValue={user.status}
              className="border p-2 rounded"
            />
          </div>

          {formState.errorMessage && (
            <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
              {formState.errorMessage}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/users/${user.id}`)}
              className="bg-gray-200 p-2 border rounded mt-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-200 p-2 border rounded mt-4"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
