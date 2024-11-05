import { Checkin, Company } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Calendar, Clock1, Edit2, User, Trash } from "lucide-react";
import { Button } from "../ui/button";
import InfoRow from "../checkin/infoRow";
import { formatWeekday } from "@/utils/checkin/formatWeekday";
import { DateTime } from "luxon";
import { getCompanyById } from "@/services/company";

export default async function ManageCheckinCard({
  checkin,
}: {
  checkin: Checkin;
}) {
  const company = await getCompanyById({ id: checkin.companyId });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-12 space-y-0">
        <CardTitle>{checkin.name}</CardTitle>
        <div className="flex flex-row gap-2">
          <Button className="px-2" variant={"ghost"}>
            <Edit2 />
          </Button>
          <Button className="px-2" variant={"ghost"}>
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <InfoRow
          icon={<Calendar className="w-4 h-4" />}
          text={formatWeekday({ days: checkin.activeDays })}
        />
        <InfoRow
          icon={<Clock1 className="w-4 h-4" />}
          text={DateTime.fromJSDate(checkin.createdAt).toLocaleString(
            DateTime.DATETIME_MED
          )}
        />
        <InfoRow
          icon={<User className="w-4 h-4" />}
          text={company.users.length.toString()}
        />
      </CardContent>
      <CardFooter className="flex flex-row gap-4">
        <Button className="w-full" variant={"outline"}>
          Voir les enregistrements
        </Button>
        <Button className="w-full" variant={"secondary"}>
          Lancer l'émargement
        </Button>
      </CardFooter>
    </Card>
  );
}
