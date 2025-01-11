import ManageCheckinCard from "@/components/company/manageCheckinCard";
import { columns } from "@/components/company/table/workerList/columns";
import WorkerList from "@/components/company/table/workerList/workerList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCheckinsByCompany } from "@/services/checkin";
import { getCompanyById } from "@/services/company";
import { ICheckinByCompany } from "@/types";
import { Key } from "react";
import { resolveActionResult } from "@/utils/next-safe-action/resolveActionResult";

export default async function Company({ params }: { params: { id: string } }) {
  const { id } = await params;
  const company = await resolveActionResult(getCompanyById({ id }));
  const checkins = await resolveActionResult(getCheckinsByCompany());

  return (
    <div className="flex flex-col gap-8 p-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="workers" className="max-w-full">
          <AccordionTrigger className="max-w-full text-left">
            <div className="truncate">Liste des employés</div>
          </AccordionTrigger>
          <AccordionContent>
            <WorkerList
              id={company.id}
              columns={columns}
              data={company.users}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="checkin" className="max-w-full">
          <AccordionTrigger className="max-w-full text-left">
            <div className="truncate">Liste des émargements</div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {checkins.map((checkin: ICheckinByCompany, key: Key) => (
              <ManageCheckinCard checkin={checkin} key={key} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
