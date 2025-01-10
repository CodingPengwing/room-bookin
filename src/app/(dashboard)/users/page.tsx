import { db } from "@/db";
import UsersTable from "@/components/react-table/UsersTable";

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Users Page</h1>
      <UsersTable users={users} />
    </div>
  );
}
