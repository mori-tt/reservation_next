import { Color, Rounded, Size } from "$/_ui";
import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import NextLink from "next/link";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  href: Url;
  shallow?: boolean;
}

// ロジックは基底のBaseに集約する
const Base = ({ children, className, href, shallow }: Props) => {
  return (
    <NextLink className={clsx(className)} href={href} shallow={shallow}>
      {children}
    </NextLink>
  );
};

const Link = {
  Back: (props: Props) => {
    return (
      <Base
        {...props}
        className={clsx(
          "flex h-8 w-8 content-center items-center justify-center rounded-full border border-slate-300 text-center text-base font-bold outline-2 outline-offset-4 outline-slate-400 transition-transform delay-0 duration-75 ease-out focus:outline active:scale-95 active:outline",
          props.className,
        )}
      />
    );
  },
  Base,
  Basic: (
    props: Props & {
      color?: Color;
      rounded?: Rounded;
      size?: Size;
    },
  ) => {
    const { color = "secondary", rounded = "full", size = "md" } = props;
    return (
      <Base
        {...props}
        className={clsx(
          "flex content-center items-center justify-center text-base font-bold outline-2 outline-offset-4 transition-transform delay-0 duration-75 ease-out focus:outline active:scale-95 active:outline",
          rounded === "full" && "rounded-full",
          color === "primary" &&
            "bg-primary-500 text-primary-50 outline-primary-400 hover:bg-primary-600",
          color === "secondary" &&
            "bg-secondary-500 text-secondary-50 outline-secondary-500 hover:bg-secondary-600",
          size === "md" && "h-16 w-full",
          props.className,
        )}
      />
    );
  },
};

export { Link };
