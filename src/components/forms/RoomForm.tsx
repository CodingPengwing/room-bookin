"use client";

// next
import { useRouter } from "next/navigation";

// material-ui
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

// assets
import GenericFormWrapper from "./GenericFormWrapper";
import { startTransition, useEffect } from "react";
import { useFormState } from "react-dom";
import { createRoom, deleteRoom } from "@/actions/rooms";
import { editRoom } from "@/actions/rooms";
import { Room } from "@prisma/client";
import { openSnackbar } from "@/components/state/snackbar";
import { SnackbarProps } from "@/components/types/snackbar";
import Snackbar from "@/components/@extended/Snackbar";

const WIDTH = 8;

interface RoomFormProps {
  variant: "create" | "edit";
  room?: Room;
}

export default function RoomForm({ variant, room }: RoomFormProps) {
  const router = useRouter();

  const [createFormState, createRoomAction] = useFormState(createRoom, {
    errorMessage: "",
  });

  const [editFormState, editRoomAction] = useFormState(editRoom, {
    errorMessage: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      if (variant === "create") {
        createRoomAction({
          name: formData.get("name") as string,
          description: formData.get("description") as string,
        });
      } else {
        editRoomAction({
          id: room?.id as string,
          name: (formData.get("name") || room?.name) as string,
          description: (formData.get("description") ||
            room?.description) as string,
        });
      }
    });
  }

  function handleSaveComplete() {
    openSnackbar({
      open: true,
      message: "Successfuly saved room.",
      variant: "alert",
      alert: {
        color: "success",
      },
    } as SnackbarProps);

    setTimeout(() => {
      if (variant === "create") {
        router.push(`/rooms`);
      } else {
        router.push(`/rooms/${room?.id}`);
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
      router.push(`/rooms`);
    }
  }

  async function handleDelete() {
    if (room) {
      await deleteRoom(room.id);
    }
  }

  return (
    <div>
      <Snackbar />
      <GenericFormWrapper
        entityName={"Room"}
        title={variant === "create" ? "Create Room" : "Edit Room"}
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
            defaultValue={room?.name}
            placeholder="Enter room name"
            fullWidth
          />
        </Grid>
        <Grid item xs={WIDTH}>
          <InputLabel htmlFor="description" sx={{ mb: 1 }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            defaultValue={room?.description}
            placeholder="Enter room description"
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
      </GenericFormWrapper>
    </div>
  );
}
