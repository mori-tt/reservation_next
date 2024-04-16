import { db, reserveDateTimes, reserveUserDetails } from "#/schema";
import { ReserveDetail } from "$/(dataEntry)/reserve/_schema";
import RegistUserInfoForm from "$/(dataEntryFix)/fix/reserve/[time]/details/_registUserInfoForm";
import { Circle } from "$/_ui/atoms/circle";
import { Input } from "$/_ui/atoms/input";
import { authOptions } from "$/api/auth/[...nextauth]/route";
import { UserPlusIcon } from "@heroicons/react/20/solid";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getReserves } from "../../page";
import HeaderFooter from "./_headerFooter";
import ReserveDateTimeSelector from "./_reservedDateTimeViewer";

// MEMO: これがないと、F5リロードなどしたときに404エラーになる。
// MEMO: 実際にモーダルの表示をしているのは、 app/(dataEntry)/@modal/(.)reserveDateTime/registUserInfo/page.tsx である。
export default async function RegistUserInfo({
  params: { time },
}: {
  params: { time?: string };
}) {
  // TODO: 他の画面へリダイレクトもできる
  // redirect("/reserve");
  // 準備
  const date = new Date(
    time !== undefined ? parseInt(time) : new Date().getTime(),
  );
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  const session = await getServerSession(authOptions);
  // 検証
  const userId = session?.user?.id;
  if (userId === undefined) throw new Error("userId is undefined");
  // 取得
  const reserveDateTimeList = await getReserves({
    unixTime: date.getTime(),
    userId,
  });
  // 加工
  const reservedTimeList = reserveDateTimeList?.map((reserveDateTime) => {
    // 0:00の形式へ変換する
    return `${reserveDateTime.reserved_at.getHours()}:${(
      "0" + reserveDateTime.reserved_at.getMinutes()
    ).slice(-2)}`;
  });
  async function create(formData: FormData) {
    "use server";
    // バリデーション
    const params = ReserveDetail.safeParse(formData);
    if (params.success === false) {
      console.error("validation error", params.error);
      const pathName = params.error.errors
        .map((e) =>
          e.path.map((p) =>
            p === "tel"
              ? "電話番号"
              : p === "realName"
                ? "氏名"
                : p === "time"
                  ? "予約時間"
                  : p,
          ),
        )
        .join("、");
      console.error(`${pathName}の入力に誤りがあります。`);
      return { message: `${pathName}の入力に誤りがあります。` };
    }
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    // バリデーション
    if (!userId) {
      console.error(`ログイン情報が存在しません。`);
      return { message: `ログイン情報が存在しません。` };
    }
    const { realName, tel, time } = params.data;
    // 登録
    const result = await db
      .transaction(async (tx) => {
        const r1 = db
          .insert(reserveDateTimes)
          .values({
            reserved_at: new Date(time),
            userId,
          })
          .run();
        console.log(r1);
        if (r1.changes !== 1) {
          tx.rollback();
          return { message: "予約に失敗しました。" };
        }
        const r2 = db
          .insert(reserveUserDetails)
          .values({
            id: userId,
            realName,
            tel,
          })
          // 同一IDが存在する場合に更新する処理
          .onConflictDoUpdate({
            set: { realName, tel },
            target: reserveUserDetails.id,
          })
          .run();
        console.log(r2);
        if (r2.changes !== 1) {
          tx.rollback();
          return { message: "予約に失敗しました。" };
        }
      })
      .catch((e) => {
        console.error(e);
        return { message: "予約に失敗しました。" };
      });
    if (result?.message) {
      console.error(result.message);
      return { message: result.message };
    } else {
      revalidatePath("/fix/reserve");
      redirect(`/fix/reserve/completed`);
    }
  }
  return (
    <>
      <HeaderFooter />
      <RegistUserInfoForm action={create}>
        <div className="flex flex-row justify-center gap-8 px-4 py-8">
          <div className="flex w-1/2 flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <ReserveDateTimeSelector
                reservedTimeList={reservedTimeList}
                unixTime={date.getTime()}
              />
            </Suspense>
          </div>
          <div className="flex flex-col content-center items-center justify-start gap-4 pt-44">
            <Circle.Basic className="relative h-28 w-28" color="secondary">
              <UserPlusIcon className="absolute right-3 top-4 h-20 w-20 fill-none stroke-secondary-900 stroke-[.5]" />
            </Circle.Basic>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-black">予約情報登録</h1>
              <p className="text-xs">
                氏名、電話番号を入力して、予約情報を登録します。
              </p>
            </div>
            <div className="space-y-1 pb-4">
              <div className="space-y-2">
                <label className="text-xs font-bold">氏名</label>
                <Input.Basic
                  autoFocus
                  color="secondary"
                  name="realName"
                  placeholder="氏名を入力して下さい"
                  required
                  title="氏名を入力して下さい"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold">電話番号</label>
                <Input.Basic
                  color="secondary"
                  name="tel"
                  pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
                  placeholder="090-1234-5678"
                  required
                  title="電話番号は半角数字または半角ハイフン（‐）で入力して下さい"
                  type="tel"
                />
              </div>
            </div>
            <input
              form="registUserInfoForm"
              name="time"
              type="hidden"
              value={date.getTime().toString()}
            />
          </div>
        </div>
      </RegistUserInfoForm>
    </>
  );
}
