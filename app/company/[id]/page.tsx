import { auth } from "@/app/auth";
import { columns } from "@/components/company/table/columns";
import WorkerList from "@/components/company/table/workerList";
import { getCompanyById } from "@/services/company";

export default async function Company() {
  const session = await auth();
  if (session?.user === undefined) return null;
  const company = await getCompanyById({ id: session.user.company.id });

  return (
    <div className="flex flex-col gap-8 p-4 w-full">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Liste des employés
        </h1>
        <WorkerList id={company.id} columns={columns} data={company.users} />
      </div>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Liste des émargements
        </h1>
      </div>
    </div>
  );
}
