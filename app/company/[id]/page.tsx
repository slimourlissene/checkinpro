import { auth } from "@/app/auth";
import ManageCheckinCard from "@/components/company/manageCheckinCard";
import { columns } from "@/components/company/table/columns";
import WorkerList from "@/components/company/table/workerList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCheckinsByCompany } from "@/services/checkin";
import { getCompanyById } from "@/services/company";
import { Checkin, Company as TCompany, User } from "@prisma/client";
import { Key } from "react";

export default async function Company() {
  const session = await auth();
  if (session?.user === undefined) return null;
  const company = await getCompanyById({ id: session.user.company.id });
  const checkins = await getCheckinsByCompany();

  return (
    <div className="flex flex-col w-full gap-8 p-4">
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="workers">
            <AccordionTrigger>Liste des employés</AccordionTrigger>
            <AccordionContent>
              <WorkerList
                id={company.id}
                columns={columns}
                data={company.users}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="checkin">
            <AccordionTrigger>Liste des émargements</AccordionTrigger>
            <AccordionContent className="flex flex-row flex-wrap gap-3">
              {checkins.map((checkin: Checkin & { company: TCompany & { users: User[] }}, key: Key) => (
                <ManageCheckinCard checkin={checkin} key={key} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div></div>
    </div>
  );
}
