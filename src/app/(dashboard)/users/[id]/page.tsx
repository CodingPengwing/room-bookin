import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { deleteUser } from "@/actions/users";
import MainCard from "@/components/MainCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

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

  const editUserAction = () => redirect(`/users/${user.id}/edit`);

  return (
    <div>
      <MainCard>
        {/* <div className="flex m-4 justify-between items-center">
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
        </div> */}
        <Typography variant="h4" sx={{ mb: 4 }}>
          {user.name}
        </Typography>
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
        {/* <form action={editUserAction}> */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="right"
          alignItems="center"
          sx={{ mt: 8 }}
        >
          <Link
            href={`/users/${user.id}/edit`}
            // className="bg-blue-200 p-2 border rounded"
          >
            {/* Edit */}
            <Button variant="contained" sx={{ textTransform: "none" }}>
              Edit User
            </Button>
          </Link>
        </Stack>
        {/* </form> */}
      </MainCard>
    </div>
  );
}

export async function generateStaticParams() {
  const users = await db.user.findMany();

  return users.map((user) => ({
    params: { id: user.id.toString() },
  }));
}
