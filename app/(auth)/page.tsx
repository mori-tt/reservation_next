import { Link } from "$/_ui/atoms/link";
import { authOptions } from "$/api/auth/[...nextauth]/route";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth/next";

import { LoginButton, LogoutButton } from "./_clientside";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <CalendarDaysIcon className="h-20 w-20" />
      <h1 className="text-base font-black">○○○○○○○ オンライン予約サイト</h1>
      <p className="pb-24 text-xs">
        新しい予約の登録や、登録した予約の変更が行えます
      </p>
      {user ? (
        <>
          <Link.Basic color="primary" href="/fix/reserve" shallow>
            予約を開始する
          </Link.Basic>
          <LogoutButton>ログアウトする</LogoutButton>
        </>
      ) : (
        <LoginButton>ログイン／新規登録</LoginButton>
      )}
      <div className="text-xs">
        {user ? "ログイン中" : "利用するにはログインまたは新規登録をして下さい"}
      </div>
      {/* NOTE: ログインセッション確認用、通常は表示しない */}
      <div className="hidden break-all text-xs">{`${JSON.stringify(
        session,
      )}`}</div>
    </>
  );
}
