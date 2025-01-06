import { DateTime } from "luxon";
import { ICheckinRecordsWithUsers } from "@/types";
import { Key } from "react";

export default function RecordList({
  records,
}: {
  records: ICheckinRecordsWithUsers[];
}) {
  return (
    <>
      {records.map((record: ICheckinRecordsWithUsers, key: Key) => (
        <ul className="list-disc pl-4" key={key}>
          <li className="text-muted-foreground font-semibold">
            {`${record.user.firstname} ${
              record.user.lastname
            } - ${DateTime.fromJSDate(record.createdAt).toFormat("HH:mm")}`}
          </li>
        </ul>
      ))}
    </>
  );
}
