"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "@/components/@extended/IconButton";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { ReactTable } from "./ReactTable";
import { User } from "@prisma/client";
import React from "react";

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "User name",
        accessorKey: "name",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "User role",
        accessorKey: "role",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "User email",
        accessorKey: "email",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "User ID",
        accessorKey: "id",
        meta: {
          className: "cell-center",
        },
      },
      {
        header: "User status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <Chip
              color={status === "ACTIVATED" ? "success" : "error"}
              label={status === "ACTIVATED" ? "Activated" : "Deactivated"}
              size="small"
              variant="light"
            />
          );
        },
      },
      {
        header: "Actions",
        meta: {
          className: "cell-center",
        },
        disableSortBy: true,
        cell: ({ row }) => {
          const userId = row.original.id;
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
                // color={row.getIsExpanded() ? "error" : "secondary"}
                onClick={() => router.push(`/users/${userId}`)}
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
    router.push(`/users/new`);
  }, []);

  return (
    <ReactTable
      {...{ data: users, columns, entityName: "User", handleAddEntity }}
    />
  );
}
