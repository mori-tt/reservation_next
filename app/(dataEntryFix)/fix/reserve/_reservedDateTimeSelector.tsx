"use client";
import { ReserveData } from "$/(dataEntry)/reserve/_schema";
import { CalendarNow } from "$/_ui/molecules/calendar";
import { TimelineBase } from "$/_ui/molecules/timeline";
import { useRouter } from "next/navigation";
import React from "react";

export default function ReservedDateTimeSelector({
  reservedTimeList,
  unixTime,
}: {
  reservedTimeList?: string[];
  unixTime: number;
}) {
  // const [unixTime, setUnixTime] = useState(Date.now());
  const router = useRouter();
  return (
    <form
      id="reservedDateTimeSelectorForm"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 準備
        const formData = new FormData(e.target as HTMLFormElement);
        // バリデーション
        const result = ReserveData.safeParse(formData);
        if (result.success === false) {
          alert(`予約日時を選択してください。`);
          return;
        }
        // 取得
        const { unixTime } = result.data;
        const date = new Date(unixTime);
        if (date.getHours() < 9 || date.getHours() > 20) {
          // 9時から20時までの間で予約可能、それ以外は選択していないとみなす。
          alert("予約時刻を選択してください。");
          return;
        }
        // 解消しているようなので、アラートを解除
        // alert(
        //   "氏名や電話番号の登録が表示されない場合は、画面をリロードして予約日時の選択をやり直して下さい。（NEXT-1160）"
        // );
        router.push(`/fix/reserve/${date.getTime().toString()}/details`);
      }}
    >
      <CalendarNow
        className="w-full"
        onChange={(unixTime) => {
          // setUnixTime(unixTime);
          router.push(`/fix/reserve?unixTime=${unixTime}`);
        }}
        unixTime={unixTime}
      />
      <TimelineBase
        className="w-full"
        disabledTimeList={["12:00"]}
        onChange={(unixTime) => {
          // setUnixTime(unixTime)
          router.push(`/fix/reserve?unixTime=${unixTime}`);
        }}
        reservedTimeList={reservedTimeList}
        unixTime={unixTime}
      />
    </form>
  );
}
