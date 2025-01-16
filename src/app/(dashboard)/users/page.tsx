import UsersTable from "@/components/react-table/UsersTable";
import { getAllUsers } from "@/db/users";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <UsersTable users={users} />
    </div>
  );
}
