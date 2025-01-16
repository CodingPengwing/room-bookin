import UsersTable from "@/components/react-table/UsersTable";
import { getAllUsers } from "@/db/users";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1>Users Page</h1>
      <UsersTable users={users} />
    </div>
  );
}
