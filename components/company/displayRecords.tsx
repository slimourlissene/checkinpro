"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { CheckinSession } from "@prisma/client";
import { ICheckinByCompany } from "@/types";
import { Accordion } from "../ui/accordion";
import RecordContent from "./recordContent";

export default function DisplayRecords({
  checkinSessions,
}: {
  checkinSessions: CheckinSession[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"outline"}>
          Voir les enregistrements
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Voir les enregistrements </DialogTitle>
          <DialogDescription>
            Vous pouvez voir les enregistrements de vos employés ici, chaque
            session d'émargement est enregistrée et listée ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <Accordion type="single" collapsible>
          {checkinSessions.map((session) => (
            {session.records.map((record) => (
              <RecordContent record={record} />
            ))}
          ))}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
