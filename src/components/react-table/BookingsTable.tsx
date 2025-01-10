"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/@extended/IconButton";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { ReactTable } from "./ReactTable";
import { Booking } from "@prisma/client";
import Link from "next/link";

export interface BookingsTableProps {
  bookings: Booking[];
}

export default function BookingsTable({ bookings }: BookingsTableProps) {
  const router = useRouter();
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
              <Link href={`/users/${userId}`}>User name</Link>
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
              <Link href={`/rooms/${roomId}`}>Room name</Link>
            </Typography>
          );
        },
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Booking ID",
        accessorKey: "id",
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
          const collapseIcon =
            row.getCanExpand() && row.getIsExpanded() ? (
              <PlusOutlined style={{ transform: "rotate(45deg)" }} />
            ) : (
              <EyeOutlined />
            );
          return (
            <Tooltip title="View">
              <IconButton
                sx={{ "&::after": { content: "none" } }}
                color={row.getIsExpanded() ? "error" : "secondary"}
                onClick={row.getToggleExpandedHandler()}
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
    router.push(`/bookings/new`);
  }, []);

  return (
    <ReactTable
      {...{ data: bookings, columns, entityName: "Booking", handleAddEntity }}
    />
  );
}
