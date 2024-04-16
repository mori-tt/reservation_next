import { db, reserveDateTimes, reserveUserDetails } from "#/schema";
import { ReserveDetail } from "$/(dataEntry)/reserve/_schema";
import { authOptions } from "$/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  // { params }: { params: { time: string } }
) {
  // 準備
  const { realName, tel, time } = ReserveDetail.parse(await request.formData());
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  // バリデーション
  if (!userId) {
    return NextResponse.json(
      { message: "ログイン情報が存在しません。" },
      { status: 401 },
    );
  }
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
    return NextResponse.json(result, { status: 500 });
  } else {
    // キャッシュを更新 TODO: このバグが原因で動かない https://github.com/vercel/next.js/issues/54173
    revalidatePath("/fix/reserve");
    return NextResponse.json({
      name: realName,
      tel,
      time,
    });
  }
}
