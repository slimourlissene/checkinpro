import { auth } from "@/app/auth";
import { columns } from "@/components/company/table/columns";
import WorkerList from "@/components/company/table/workerList";
import { getCompanyById } from "@/services/company";

export default async function Company() {
  const session = await auth();
  if (session?.user === undefined) return null;
  const company = await getCompanyById({ id: session.user.company.id });

  return (
    <div className="p-4 w-full">
      <WorkerList columns={columns} data={company.users} />
    </div>
  );
}
