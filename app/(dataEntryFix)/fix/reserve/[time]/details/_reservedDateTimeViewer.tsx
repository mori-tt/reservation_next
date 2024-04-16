"use client";
import { CalendarNow } from "$/_ui/molecules/calendar";
import { TimelineBase } from "$/_ui/molecules/timeline";

export default function ReservedDateTimeViewer({
  reservedTimeList,
  unixTime,
}: {
  reservedTimeList?: string[];
  unixTime: number;
}) {
  return (
    <>
      <CalendarNow className="w-full" unixTime={unixTime} />
      <TimelineBase
        className="w-full"
        disabledTimeList={["12:00"]}
        reservedTimeList={reservedTimeList}
        unixTime={unixTime}
      />
    </>
  );
}
