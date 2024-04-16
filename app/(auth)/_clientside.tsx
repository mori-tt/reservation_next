"use client";

import { Button } from "$/_ui/atoms/button";
import { signIn, signOut } from "next-auth/react";
import { ReactNode } from "react";

export const LoginButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button.Basic color="primary" onClick={() => signIn()}>
      {children}
    </Button.Basic>
  );
};

export const LogoutButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button.Basic color="secondary" onClick={() => signOut()}>
      {children}
    </Button.Basic>
  );
};
