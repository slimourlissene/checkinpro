"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteWorker from "./deleteWorker";
import ModifyWorker from "./modifyWorker";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mt-1"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout sélectionner"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mt-1"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner une ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "firstname",
    accessorKey: "firstname",
    header: "Prénom",
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    id: "email",
    accessorKey: "email",
    header: () => <span className="max-sm:hidden">Email</span>,
    cell: ({ row }) => {
      return <span className="max-sm:hidden"> {row.getValue("email")} </span>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
];

function Actions({ row }: { row: Row<User> }) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="*:cursor-pointer" align="start">
        <ModifyWorker user={row.original} setDropdownOpen={setDropdownOpen} />
        <DeleteWorker
          emails={[row.getValue("email")]}
          isDropdownButton={true}
          setDropdownOpen={setDropdownOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
