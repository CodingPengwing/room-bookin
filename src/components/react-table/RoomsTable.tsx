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
import { Room } from "@prisma/client";
import Link from "next/link";
import RoomEditForm from "../forms/RoomForm";

export interface RoomsTableProps {
  rooms: Room[];
}

export default function RoomsTable({ rooms }: RoomsTableProps) {
  const router = useRouter();
  const columns = useMemo<ColumnDef<Room>[]>(
    () => [
      {
        header: "Room name",
        accessorKey: "name",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Description",
        accessorKey: "description",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Room ID",
        accessorKey: "id",
        cell: ({ getValue }) => {
          const roomId = getValue() as string;
          return (
            <Typography variant="body1">
              <Link href={`/rooms/${roomId}`}>{roomId}</Link>
            </Typography>
          );
        },
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "Date created",
        accessorKey: "createdAt",
        cell: ({ getValue }) => (
          <Typography>
            {new Date(getValue() as string).toLocaleDateString()}
          </Typography>
        ),
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
    router.push(`/rooms/new`);
  }, []);

  function renderExpandedForm(data: Room) {
    return <RoomEditForm variant="edit" room={data} />;
  }

  return (
    <ReactTable
      {...{
        data: rooms,
        columns,
        entityName: "Room",
        handleAddEntity,
        expandedRowRender: renderExpandedForm,
      }}
    />
  );
}
