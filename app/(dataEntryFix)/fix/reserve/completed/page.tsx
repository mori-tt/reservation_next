import { Circle } from "$/_ui/atoms/circle";
import { CheckIcon } from "@heroicons/react/20/solid";
import { revalidatePath } from "next/cache";

import HeaderFooter from "./_headerFooter";

export default async function ReserveDateTimeComplete() {
  // キャッシュクリア
  revalidatePath("/fix/reserve");
  return (
    <>
      <HeaderFooter />
      <div className="flex h-[calc(100dvh-20rem)] flex-col content-center items-center justify-center gap-4">
        <Circle.Basic className="relative h-28 w-28" color="secondary">
          <CheckIcon className="absolute right-3 top-4 h-20 w-20 fill-none stroke-secondary-900 stroke-[.5]" />
        </Circle.Basic>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-black">予約を完了しました</h1>
          <p className="text-xs">
            予約日時になったら、○○○○○○○へお越しください。
          </p>
        </div>
      </div>
    </>
  );
}
