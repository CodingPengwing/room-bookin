import Link from "next/link";
import { db } from "@/db";

export default async function UsersPage() {
  const users = await db.user.findMany();

  const renderedUsers = users.map((user) => (
    <Link
      key={user.id}
      href={`/users/${user.id}`}
      className="flex justify-between items-center p-2 border rounded"
    >
      <div>{user.name}</div>
      <div>View</div>
    </Link>
  ));

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="bg-blue-200 p-2 border rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedUsers}</div>
    </div>
  );
}
