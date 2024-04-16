import clsx from "clsx";
import React from "react";

export default function RegistUserInfoForm({
  action,
  children,
  modal = false,
}: {
  action?: ((formData: FormData) => void) | string | undefined;
  children: React.ReactNode;
  modal?: boolean;
}) {
  return (
    <form
      action={action}
      className={clsx(modal ? "modal-box" : "w-full")}
      id="registUserInfoForm"
    >
      {children}
    </form>
  );
}
