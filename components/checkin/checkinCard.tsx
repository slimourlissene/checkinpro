import { Checkin, Company } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Building, Calendar, Clock1 } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "../ui/button";
import InfoRow from "./infoRow";
import { truncateText } from "@/utils/checkin/truncateText";
import { formatWeekday } from "@/utils/checkin/formatWeekday";
import ScanQRCode from "./scanQRCode";

export default async function CheckinCard({
  checkin,
}: {
  checkin: Checkin & { company: Company };
}) {
  const isActive = checkin.activeDays.includes(
    DateTime.now().get("weekday").toString()
  );

  return (
    <Card className="w-[475px] h-[275px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>
          {" "}
          {truncateText({ text: checkin.name, maxLength: 19 })}{" "}
        </CardTitle>
        <Badge className="space-y-0">{isActive ? "Actif" : "Inactif"}</Badge>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-4">
        <InfoRow
          icon={<Building className="w-4 h-4" />}
          text={truncateText({ text: checkin.company.name, maxLength: 30 })}
        />
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
      </CardContent>
      <CardFooter className="mt-auto">
        <ScanQRCode />
      </CardFooter>
    </Card>
  );
}
