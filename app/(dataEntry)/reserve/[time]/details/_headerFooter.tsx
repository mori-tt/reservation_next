"use client";
import { useHeaderFooter } from "$/(dataEntry)/_hooks";
import { Button } from "$/_ui/atoms/button";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function HeaderFooter() {
  const [headerEl, footerEl] = useHeaderFooter();
  const router = useRouter();
  return (
    <>
      {headerEl &&
        createPortal(
          <>
            <Button.Back onClick={() => router.back()}>
              <ChevronLeftIcon className="h-5 w-5" />
            </Button.Back>
            <h1 className="text-base font-black">○○○○○○○ 予約登録・変更</h1>
            <div />
          </>,
          headerEl,
        )}
      {footerEl &&
        createPortal(
          <Button.Basic color="primary" form="registUserInfoForm" type="submit">
            予約する
          </Button.Basic>,
          footerEl,
        )}
    </>
  );
}
