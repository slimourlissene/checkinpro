"use client";
import { Checkin, CheckinSession, Company, Record, User } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Calendar, Clock1, Edit2, User as UserIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import InfoRow from "../checkin/infoRow";
import { formatWeekday } from "@/utils/checkin/formatWeekday";
import { DateTime } from "luxon";
import LaunchCheckin from "./launchCheckin";
import DisplayRecords from "./displayRecords";
import { ICheckinByCompany } from "@/types";

export default function ManageCheckinCard({
  checkin,
}: {
  checkin: ICheckinByCompany;
}) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-12 space-y-0">
        <CardTitle>{checkin.name}</CardTitle>
        <div className="flex flex-row gap-2">
          <Button className="px-2" variant="ghost">
            <Edit2 />
          </Button>
          <Button className="px-2" variant="ghost">
            <Trash />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-3">
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
          icon={<UserIcon className="w-4 h-4" />}
          text={checkin.company.users.length.toString()}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <DisplayRecords checkinSessions={checkin.sessions} />
        <LaunchCheckin id={checkin.id} />
      </CardFooter>
    </Card>
  );
}
