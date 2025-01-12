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
import { ICheckinSessionWithRecords } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Key } from "react";
import RecordList from "./table/recordList/recordList";
import { DateTime } from "luxon";

export default function DisplayRecords({
  checkinSessions,
}: {
  checkinSessions: ICheckinSessionWithRecords[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"outline"}>
          Voir les enregistrements
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle> Voir les enregistrements </DialogTitle>
          <DialogDescription>
            Vous pouvez voir les enregistrements de vos employés ici, chaque
            session d&apos;émargement est enregistrée et listée ci-dessous.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[450px] p-4">
          <Accordion type="single" collapsible>
            {checkinSessions.map(
              (checkinSession: ICheckinSessionWithRecords, key: Key) =>
                checkinSession.records.length > 0 ? (
                  <AccordionItem key={key} value={checkinSession.id}>
                    <AccordionTrigger>
                      Émargement du{" "}
                      {DateTime.fromJSDate(checkinSession.createdAt).toFormat(
                        "dd/MM/yyyy"
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      <RecordList key={key} records={checkinSession.records} />
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <AccordionItem key={key} value={checkinSession.id}>
                    <AccordionTrigger>
                      Émargement du{" "}
                      {checkinSession.createdAt.toLocaleDateString()}{" "}
                    </AccordionTrigger>
                    <AccordionContent>
                      <span className="text-muted-foreground font-semibold">
                        Aucun enregistrement pour cette session
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                )
            )}
          </Accordion>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
