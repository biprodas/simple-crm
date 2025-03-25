"use client";

import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "~/components/ui/checkbox";
import { Actions } from "./actions";
import { IProject } from "~/features/project/apis/dto";
import { DataTableColumnHeader } from "~/components/data-table-column-header";

export const columns: ColumnDef<IProject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => format(row.getValue("startDate"), "dd MMM, yyyy"),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => format(row.getValue("dueDate"), "dd MMM, yyyy"),
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "timeEstimated",
    header: "Time Estimated",
  },
  {
    accessorKey: "timeTracked",
    header: "Time Tracked",
  },
  {
    accessorKey: "timeDifference",
    header: "Time Difference",
    cell: ({ row }) => {
      const timeEstimated = row.getValue("timeEstimated") as number;
      const timeTracked = row.getValue("timeTracked") as number;
      if(timeTracked <= timeEstimated)  return "-";
      
      return timeTracked - timeEstimated;
    }
      
  },
  {
    accessorKey: "projectType",
    header: "Project Type",
  },
  {
    accessorKey: "projectValue",
    header: "Project Value",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
