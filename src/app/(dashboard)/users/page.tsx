import Link from "next/link";
import { db } from "@/db";
import UsersTable from "@/components/react-table/UsersTable";

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
      <h1>Users Page</h1>
      <UsersTable users={users} />
    </div>
  );
}
