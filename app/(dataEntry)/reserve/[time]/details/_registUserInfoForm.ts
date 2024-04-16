"use client";
import {
  ErrorResponse,
  ReserveDataResponse,
  ReserveDetail,
} from "$/(dataEntry)/reserve/_schema";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

export default function RegistUserInfoForm({
  children,
  modal = false,
  onSuccess,
}: {
  children: React.ReactNode;
  modal?: boolean;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  return (
    <form
      // action={action}
      className={clsx(modal ? "modal-box" : "w-full")}
      // FIXME: https://github.com/vercel/next.js/issues/54676 の不具合でServer Actionでredirectが使えないので、onSubmitでAPIを叩くようにする
      id="registUserInfoForm"
      onSubmit={async (e) => {
        e.preventDefault();
        // 準備
        const formData = new FormData(
          (e.target as HTMLFormElement) || undefined,
        );
        // バリデーション
        const result = ReserveDetail.safeParse(formData);
        if (result.success === false) {
          console.error("validation error", result.error);
          const pathName = result.error.errors
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
          alert(`${pathName}の入力に誤りがあります。`);
          return;
        }
        // 登録
        const { realName, tel, time } = result.data;
        console.log("registData", realName, tel, time);
        const res = await fetch(`/reserve/${time}/details/register`, {
          body: formData,
          method: "POST",
        });
        const data = await res.json();
        console.log("responseData", data);
        // 判定
        const respDataReturn = ReserveDataResponse.safeParse(data);
        if (respDataReturn.success === true) {
          // 成功の場合
          onSuccess && onSuccess();
          const { time } = respDataReturn.data;
          const date = new Date(time);
          alert(
            `予約が完了しました。\n（${date.getMonth()}月${
              date.getDate() - 1
            }日 ${date.getHours()}時）`,
          );
          // 画面移動
          router.push("/reserve/completed");
        } else {
          // エラーの場合
          const errorDataReturn = ErrorResponse.safeParse(data);
          if (errorDataReturn.success === true) {
            const { message } = errorDataReturn.data;
            alert(message);
          }
        }
      }}
    >
      {children}
    </form>
  );
}