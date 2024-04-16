import RegistUserInfoDialogForm from "$/(dataEntry)/@modal/(.)reserve/[time]/details/_registUserInfoDialogForm";
import { Circle } from "$/_ui/atoms/circle";
import { Input } from "$/_ui/atoms/input";
import { UserPlusIcon } from "@heroicons/react/20/solid";
// import { redirect } from "next/navigation";

export default function RegistUserInfo() {
  // FIXME: https://github.com/vercel/next.js/issues/54676 の不具合でServer Actionでredirectが使えないので、onSubmitでAPIを叩くようにする
  // async function create(formData: FormData) {
  //   "use server";
  //   // mutate data
  //   // revalidate cache
  //   console.log("aaaaaaaaa", formData);
  //   redirect("/reserve/completed");
  // }
  return (
    <RegistUserInfoDialogForm /*action={create}*/>
      <div className="flex flex-col content-center items-center justify-center gap-4">
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
      </div>
    </RegistUserInfoDialogForm>
  );
}
