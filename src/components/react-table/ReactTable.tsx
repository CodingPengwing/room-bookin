"use client";

import { Fragment, useCallback, useState } from "react";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  ColumnDef,
  HeaderGroup,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable,
  SortingState,
  FilterFn,
} from "@tanstack/react-table";

// third-party
import { rankItem } from "@tanstack/match-sorter-utils";

// project-import
import ScrollX from "@/components/ScrollX";
import MainCard from "@/components/MainCard";

import {
  CSVExport,
  DebouncedInput,
  HeaderSort,
  RowSelection,
  SelectColumnSorting,
  TablePagination,
} from "./utils";

import ProductView from "../forms/ProductView";

export interface LabelKeyObject {
  label: string;
  key: string;
}

// assets
import PlusOutlined from "@ant-design/icons/PlusOutlined";

interface Props<T extends object> {
  entityName: string;
  data: T[];
  columns: ColumnDef<T>[];
  handleAddEntity?: () => void;
  expandedRowRender?: (data: T) => React.ReactNode;
}

// ==============================|| REACT TABLE - LIST ||============================== //

export function ReactTable<T extends object>({
  data,
  columns,
  entityName,
  handleAddEntity,
  expandedRowRender,
}: Props<T>) {
  const fuzzyFilter: FilterFn<T> = useCallback(
    (row, columnId, value, addMeta) => {
      // rank the item
      const itemRank = rankItem(row.getValue(columnId), value);
      // store the ranking info
      addMeta(itemRank);
      // return if the item should be filtered in/out
      return itemRank.passed;
    },
    []
  );

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [sorting, setSorting] = useState<SortingState>([
    // default sorting if needed
    // {
    //   id: "name",
    //   desc: false,
    // },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: true,
  });

  const backColor = alpha(theme.palette.primary.lighter, 0.1);
  let headers: LabelKeyObject[] = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === "string" ? columns.header : "#",
        // @ts-ignore
        key: columns.accessorKey,
      })
  );

  return (
    <MainCard content={false}>
      <Stack
        direction={matchDownSM ? "column" : "row"}
        spacing={2}
        alignItems={matchDownSM ? "flex-start" : "center"}
        justifyContent="space-between"
        sx={{ padding: 2 }}
      >
        <DebouncedInput
          value={globalFilter ?? ""}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Search ${data.length} records...`}
        />

        <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
          <SelectColumnSorting
            {...{
              getState: table.getState,
              getAllColumns: table.getAllColumns,
              setSorting,
            }}
          />
          {handleAddEntity && (
            <Button
              variant="contained"
              sx={{ textWrap: "nowrap" }}
              startIcon={<PlusOutlined />}
              onClick={handleAddEntity}
            >
              Add {entityName}
            </Button>
          )}
          <CSVExport
            {...{
              data:
                table.getSelectedRowModel().flatRows.map((row) => row.original)
                  .length === 0
                  ? data
                  : table
                      .getSelectedRowModel()
                      .flatRows.map((row) => row.original),
              headers,
              filename: `${entityName}-list.csv`,
            }}
          />
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table>
              <TableHead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup: HeaderGroup<any>) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        if (
                          header.column.columnDef.meta !== undefined &&
                          header.column.getCanSort()
                        ) {
                          Object.assign(header.column.columnDef.meta, {
                            className:
                              header.column.columnDef.meta.className +
                              " cursor-pointer prevent-select",
                          });
                        }

                        return (
                          <TableCell
                            key={header.id}
                            {...header.column.columnDef.meta}
                            onClick={header.column.getToggleSortingHandler()}
                            {...(header.column.getCanSort() &&
                              header.column.columnDef.meta === undefined && {
                                className: "cursor-pointer prevent-select",
                              })}
                          >
                            {header.isPlaceholder ? null : (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Box>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </Box>
                                {header.column.getCanSort() && (
                                  <HeaderSort column={header.column} />
                                )}
                              </Stack>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && expandedRowRender && (
                      <TableRow
                        sx={{
                          bgcolor: backColor,
                          "&:hover": { bgcolor: `${backColor} !important` },
                        }}
                      >
                        <TableCell colSpan={row.getVisibleCells().length}>
                          {expandedRowRender(row.original)}
                          {/* <ProductView data={row.original} /> */}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount,
                  initialPageSize: 5,
                }}
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}
