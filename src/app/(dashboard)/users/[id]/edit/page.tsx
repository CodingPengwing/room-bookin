import { notFound } from "next/navigation";
import UserEditForm from "@/components/forms/UserEditForm";
import { getUserById } from "@/db/users";

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

  return <UserEditForm user={user} />;
}
