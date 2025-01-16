import { notFound } from "next/navigation";
import { getUserById } from "@/db/users";
import UserForm from "@/components/forms/UserForm";

interface UserEditPageProps {
  params: {
    id: string;
  };
}

export default async function UserEditPage(props: UserEditPageProps) {
  const { id } = props.params;

  const user = await getUserById(id);

  if (!user) {
    return notFound();
  }

  // return <UserEditForm user={user} />;
  return <UserForm variant="edit" user={user} />;
}
