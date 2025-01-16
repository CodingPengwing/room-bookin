"use client";

// next
import { useRouter } from "next/navigation";

// material-ui
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

// assets
import GenericFormWrapper from "./GenericFormWrapper";
import { startTransition, useEffect } from "react";
import { useFormState } from "react-dom";
import { createUser, deleteUser } from "@/actions/users";
import { editUser } from "@/actions/users";
import { User, UserRole, UserStatus } from "@prisma/client";
import { openSnackbar } from "@/components/state/snackbar";
import { SnackbarProps } from "@/components/types/snackbar";
import Snackbar from "@/components/@extended/Snackbar";

const WIDTH = 8;

interface UserFormProps {
  variant: "create" | "edit";
  user?: User;
}

export default function UserForm({ variant, user }: UserFormProps) {
  const router = useRouter();

  const [createFormState, createUserAction] = useFormState(createUser, {
    errorMessage: "",
  });

  const [editFormState, editUserAction] = useFormState(editUser, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      if (variant === "create") {
        createUserAction({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          role: formData.get("role") as UserRole,
        });
      } else {
        editUserAction({
          id: user?.id as string,
          name: (formData.get("name") || user?.name) as string,
          email: (formData.get("email") || user?.email) as string,
          password: (formData.get("password") || user?.password) as string,
          role: (formData.get("role") || user?.role) as UserRole,
          status: (formData.get("status") || user?.status) as UserStatus,
        });
      }
    });
  }

  function handleSaveComplete() {
    openSnackbar({
      open: true,
      message: "Successfuly saved user.",
      variant: "alert",
      alert: {
        color: "success",
      },
    } as SnackbarProps);

    setTimeout(() => {
      if (variant === "create") {
        router.push(`/users`);
      } else {
        router.push(`/users/${user?.id}`);
      }
    }, 2000);
  }

  useEffect(() => {
    if (createFormState.completed || editFormState.completed) {
      handleSaveComplete();
    }
  }, [createFormState.completed, editFormState.completed]);

  function handleCancel() {
    if (variant === "create") {
      router.push(`/users`);
    } else {
      router.push(`/users/${user?.id}`);
    }
  }

  async function handleDelete() {
    if (user) {
      await deleteUser(user.id);
    }
  }

  return (
    <div>
      <Snackbar />
      <GenericFormWrapper
        entityName={"User"}
        title={variant === "create" ? "Create User" : "Edit User"}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        onDelete={variant === "create" ? undefined : handleDelete}
        errorMessage={
          createFormState.errorMessage || editFormState.errorMessage
        }
      >
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="name" sx={{ mb: 1 }}>
            Name
          </InputLabel>
          <TextField
            name="name"
            defaultValue={user?.name}
            placeholder="Enter user name"
            fullWidth
          />
        </Grid>
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="email" sx={{ mb: 1 }}>
            Email
          </InputLabel>
          <TextField
            name="email"
            defaultValue={user?.email}
            placeholder="Enter user email"
            fullWidth
            disabled={variant === "edit"}
            //   multiline
            //   rows={3}
          />
        </Grid>
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="password" sx={{ mb: 1 }}>
            Password
          </InputLabel>
          <TextField
            name="password"
            defaultValue={user?.password}
            placeholder="Enter password"
            fullWidth
          />
        </Grid>
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="role" sx={{ mb: 1 }}>
            Role
          </InputLabel>
          <TextField
            name="role"
            defaultValue={user?.role}
            placeholder="Select Role"
            fullWidth
            select
          >
            {["ADMIN", "USER"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="status" sx={{ mb: 1 }}>
            Status
          </InputLabel>
          <TextField
            name="status"
            defaultValue={user?.status}
            placeholder="Select Status"
            fullWidth
            select
          >
            {["ACTIVATED", "DEACTIVATED"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </GenericFormWrapper>
    </div>
  );
}
