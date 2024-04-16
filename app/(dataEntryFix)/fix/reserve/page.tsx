import { db, reserveDateTimes } from "#/schema";
import { authOptions } from "$/api/auth/[...nextauth]/route";
import { between } from "drizzle-orm";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";

import HeaderFooter from "./_headerFooter";
import ReserveDateTimeSelector from "./_reservedDateTimeSelector";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const getReserves = async ({
  unixTime,
  userId,
}: {
  unixTime: number;
  userId: string;
}): Promise<
  {
    id: number;
    reserved_at: Date;
    user_id: string;
  }[]
> => {
  // 準備
  const date = new Date(unixTime);
  const fromDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
  );
  const toDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
  );
  // 取得
  const reserveDateTimeList = db
    .select({
      id: reserveDateTimes.id,
      reserved_at: reserveDateTimes.reserved_at,
      user_id: reserveDateTimes.userId,
    })
    .from(reserveDateTimes)
    .where(between(reserveDateTimes.reserved_at, fromDate, toDate))
    .all();
  // 返却
  return reserveDateTimeList;
};

export default async function ReservedDateTime({
  searchParams: { unixTime },
}: {
  searchParams: { unixTime?: string };
}) {
  // 準備
  const validUnixTime =
    unixTime !== undefined ? parseInt(unixTime) : new Date().getTime();
  const session = await getServerSession(authOptions);
  // 検証
  const userId = session?.user?.id;
  if (userId === undefined) throw new Error("userId is undefined");
  // 取得
  const reserveDateTimeList = await getReserves({
    unixTime: validUnixTime,
    userId,
  });
  // 加工
  const reservedTimeList = reserveDateTimeList?.map((reserveDateTime) => {
    // 0:00の形式へ変換する
    return `${reserveDateTime.reserved_at.getHours()}:${(
      "0" + reserveDateTime.reserved_at.getMinutes()
    ).slice(-2)}`;
  });
  return (
    <>
      <HeaderFooter />
      <Suspense fallback={<div>Loading...</div>}>
        <ReserveDateTimeSelector
          reservedTimeList={reservedTimeList}
          unixTime={validUnixTime}
        />
      </Suspense>
      <input
        form="reservedDateTimeSelectorForm"
        name="unixTime"
        type="hidden"
        value={unixTime}
      />
    </>
  );
}
