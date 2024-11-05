import { Checkin, Company } from "@prisma/client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge";
import { Building, Calendar, Clock1 } from "lucide-react";
import { DateTime, WeekdayNumbers } from "luxon";
import { Button } from "../ui/button";

function truncateText({ text, maxLength }: { text: string, maxLength: number }) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

function formatWeekday({ days }: { days: string[] }): string {
  const daysInFranch = days.map((day: string) => {
    return DateTime.now().set({ weekday: parseInt(day) as WeekdayNumbers }).setLocale("fr").toFormat("cccc");
  });

  return daysInFranch.join(', ');
}

export default async function CheckinCard({
  checkin
}: {
  checkin: Checkin & { company: Company }
}) {
  const isActive = checkin.activeDays.includes(DateTime.now().get("weekday").toString());

  return (
    <Card className="w-[475px] h-[275px] flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0 justify-between">
        <CardTitle> {truncateText({ text: checkin.name, maxLength: 19 })} </CardTitle>
        <Badge className="space-y-0">
          {
            isActive ? 'Actif' : 'Inactif'
          }
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        <InfoRow icon={<Building className="h-4 w-4" />} text={
          truncateText({ text: checkin.company.name, maxLength: 30 })
        } />
        <InfoRow icon={<Calendar className="h-4 w-4" />} text={formatWeekday({ days: checkin.activeDays })} />
        <InfoRow icon={<Clock1 className="h-4 w-4" />} text={DateTime.fromJSDate(checkin.createdAt).toLocaleString(DateTime.DATETIME_MED)} />
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" disabled={!isActive}>
          S'émarger
        </Button>
      </CardFooter>
    </Card>
  );
}

function InfoRow({ icon, text }: {
  icon: JSX.Element,
  text: string
}) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-semibold capitalize text-sm text-muted-foreground ">
        {text}
      </span>
    </div>
  )
}