import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { deleteUser } from "@/actions/users";

interface UserPageProps {
  params: {
    id: string;
  };
}

export default async function UserPage(props: UserPageProps) {
  const { id } = props.params;

  const user = await db.user.findFirst({
    where: { id },
  });

  if (!user) {
    return notFound();
  }

  const deleteUserAction = deleteUser.bind(null, user.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <div className="flex gap-4">
          <Link
            href={`/users/${user.id}/edit`}
            className="bg-blue-200 p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteUserAction}>
            <button className="bg-red-200 p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      {/* make everything below editable in a form */}
      <div className="m-4 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Created at:</span>{" "}
          {user.createdAt.toISOString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Role:</span> {user.role}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Status:</span> {user.status}
        </p>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await db.user.findMany();

  return users.map((user) => ({
    params: { id: user.id.toString() },
  }));
}
