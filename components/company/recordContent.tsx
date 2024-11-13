import { Record, User } from "@prisma/client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DateTime } from "luxon";

export default function RecordContent({
  record,
}: {
  record: Record & { user: User };
}) {
  return (
    <AccordionItem value={record.id}>
      <AccordionTrigger>
        Émargement du{" "}
        {DateTime.fromJSDate(record.createdAt).toFormat("dd/MM/yyyy")}{" "}
      </AccordionTrigger>
      <AccordionContent>Oui</AccordionContent>
    </AccordionItem>
  );
}
