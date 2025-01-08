"use server";

import { getCheckinsByCompany } from "@/services/checkin";
import { Checkin as TCheckin, Company } from "@prisma/client";
import { Key } from "react";
import CheckinCard from "@/components/checkin/checkinCard";
import { resolveActionResult } from "@/utils/next-safe-action/resolveActionResult";

export default async function Checkin() {
  const checkin: (TCheckin & { company: Company })[] | null =
    await resolveActionResult(getCheckinsByCompany());

  return (
    <section>
      <div className="p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Liste de mes émargements
        </h1>
        <p className="leading-7 text-muted-foreground">
          Vous trouverez ci-dessous la liste des émargements auxquels vous êtes
          inscrits.
        </p>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {checkin?.map(
              (checkin: TCheckin & { company: Company }, key: Key) => (
                <CheckinCard checkin={checkin} key={key} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
