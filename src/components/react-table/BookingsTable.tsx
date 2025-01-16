"use client";

import { useCallback, useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/@extended/IconButton";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { ReactTable } from "./ReactTable";
import { Booking, Room, User } from "@prisma/client";
import Link from "next/link";
import BookingCreateForm from "@/components/forms/BookingCreateForm";
import BookingEditForm from "@/components/forms/BookingEditForm";
import { openSnackbar } from "@/components/state/snackbar";
import { SnackbarProps } from "@/components/types/snackbar";
import Snackbar from "../@extended/Snackbar";

export interface BookingsTableProps {
  bookings: Booking[];
  users: User[];
  roomsWithBookings: (Room & { bookings: Booking[] })[];
}

export default function BookingsTable({
  bookings,
  users,
  roomsWithBookings,
}: BookingsTableProps) {
  // const router = useRouter();

  const [modalTarget, setModalTarget] = useState<"new" | Booking | null>(null);
  // const [modalState, setModalState] = useState(false);
  // const [modalType, setModalType] = useState<"create" | "edit">("create");
  // const [selectedBookingId, setSelectedBookingId] = useState<string>("");

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ getValue }) => (
          <Typography variant="subtitle1">
            {new Date(getValue() as string).toLocaleDateString()}
          </Typography>
        ),
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "User",
        accessorKey: "userId",
        cell: ({ getValue }) => {
          const userId = getValue() as string;
          return (
            <Typography variant="body1">
              <Link href={`/users/${userId}`}>
                {users.find((user) => user.id === userId)?.name}
              </Link>
            </Typography>
          );
        },
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Room",
        accessorKey: "roomId",
        cell: ({ getValue }) => {
          const roomId = getValue() as string;
          return (
            <Typography variant="body1">
              <Link href={`/rooms/${roomId}`}>
                {roomsWithBookings.find((room) => room.id === roomId)?.name}
              </Link>
            </Typography>
          );
        },
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Actions",
        meta: {
          className: "cell-center",
        },
        disableSortBy: true,
        cell: ({ row }) => {
          const collapseIcon = <EyeOutlined />;
          return (
            <Tooltip title="View">
              <IconButton
                sx={{ "&::after": { content: "none" } }}
                // color={row.getIsExpanded() ? "error" : "secondary"}
                onClick={() => {
                  setModalTarget(row.original);
                }}
              >
                {collapseIcon}
              </IconButton>
            </Tooltip>
          );
        },
      },
    ],
    []
  );

  const handleAddEntity = useCallback(() => {
    // router.push(`/bookings/new`);
    setModalTarget("new");
  }, []);

  const sortedUsers = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  );

  const sortedRooms = useMemo(
    () => roomsWithBookings.sort((a, b) => a.name.localeCompare(b.name)),
    [roomsWithBookings]
  );

  const handleSubmit = useCallback(() => {
    openSnackbar({
      open: true,
      message: "Save successful!",
      variant: "alert",
      alert: {
        color: "success",
      },
    } as SnackbarProps);
    setModalTarget(null);
  }, []);

  return (
    <div>
      <Snackbar />
      <div className="relative">
        {/* Modal Overlay and Modal */}
        <div
          className={`fixed justify-center items-center h-full inset-0 bg-black bg-opacity-50 z-50 ${modalTarget ? "block" : "hidden"}`}
          onClick={() => setModalTarget(null)} // Close modal if background is clicked
        >
          <div className="flex justify-center items-center h-full">
            <div
              className="bg-white p-6 rounded-lg w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {modalTarget === "new" && (
                <BookingCreateForm
                  users={sortedUsers}
                  roomsWithBookings={sortedRooms}
                  onSubmit={handleSubmit}
                />
              )}
              {modalTarget && typeof modalTarget === "object" && (
                <BookingEditForm
                  booking={modalTarget}
                  users={sortedUsers}
                  roomsWithBookings={sortedRooms}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <ReactTable
          {...{
            data: bookings,
            columns,
            entityName: "Booking",
            handleAddEntity,
          }}
        />
      </div>
    </div>
  );
}
