"use client";
import { useHeaderFooter } from "$/(dataEntry)/_hooks";
import { Button } from "$/_ui/atoms/button";
import NextLink from "next/link";
import { createPortal } from "react-dom";

export default function HeaderFooter() {
  const [headerEl, footerEl] = useHeaderFooter();
  return (
    <>
      {headerEl &&
        createPortal(
          <>
            <div />
            <h1 className="text-base font-black">
              ○○○○○○○ 予約登録・変更完了Fix
            </h1>
            <div />
          </>,
          headerEl,
        )}
      {footerEl &&
        createPortal(
          <NextLink href="/fix/reserve">
            <Button.Basic color="secondary">予約を追加する</Button.Basic>
          </NextLink>,
          footerEl,
        )}
    </>
  );
}
