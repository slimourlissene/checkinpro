"use server";

import { getCheckinsByCompany } from "@/services/checkin";

export default async function Checkin() {
  const checkin = await getCheckinsByCompany();

  return (
    <section>
      <div className="p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Liste de mes émargements
        </h1>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {checkin.map((checkin) => (
              <div key={checkin.id} className="shadow-sm rounded-md">
                <h2 className="text-lg font-semibold">{checkin.name}</h2>
                <p className="text-sm">{checkin.activeDays.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}