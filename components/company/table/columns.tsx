"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeleteWorker from "./deleteWorker";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
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
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Sélectionner une ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: () => <span className="max-sm:hidden">Prénom</span>,
    cell: ({ row }) => {
      return (
        <span className="max-sm:hidden"> {row.getValue("firstname")} </span>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
      return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="*:cursor-pointer" align="start">
            <DropdownMenuItem>Modifier</DropdownMenuItem>
            <DeleteWorker
              emails={[row.getValue("email")]}
              isDropdownButton={true}
              setDropdownOpen={setDropdownOpen}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
