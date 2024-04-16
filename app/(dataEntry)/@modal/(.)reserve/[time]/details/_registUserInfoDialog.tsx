"use client";
import RegistUserInfoForm from "$/(dataEntry)/reserve/[time]/details/_registUserInfoForm";
import { Button } from "$/_ui/atoms/button";
import clsx from "clsx";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function RegistUserInfoDialogForm({
  action,
  children,
}: {
  action?: ((formData: FormData) => void) | string;
  children: React.ReactNode;
}) {
  const { time } = useParams();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    // FIXME おそらく、このIssueの不具合で、useEffectが2回目は呼ばれない https://github.com/vercel/next.js/issues/49662 -> 一旦、[time]をパスパラメータに追加することで回避
    console.log("+ useEffect");
    setOpen(true);
    return () => {
      console.log("- useEffect");
      setOpen(false);
    };
  }, []);
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div
      className={clsx(
        "modal modal-bottom sm:modal-middle",
        open && "modal-open",
      )}
      key={pathName}
    >
      <RegistUserInfoForm modal={true} onSuccess={() => setOpen(false)}>
        {children}
        <input name="time" type="hidden" value={time} />
        <div className={clsx("modal-action w-full")}>
          <Button.Basic
            color="primary"
            form="registUserInfoForm"
            type="submit"
            value="complete"
          >
            予約する
          </Button.Basic>
        </div>
      </RegistUserInfoForm>
      <div className="modal-backdrop bg-black/80">
        <button onClick={() => router.back()}>&nbsp;</button>
      </div>
    </div>
  );
}
