import { Color } from "$/_ui";
import clsx from "clsx";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

// ロジックは基底に集約する
const Base = ({ children, className, id }: Props) => {
  return (
    <div className={clsx(className)} id={id}>
      {children}
    </div>
  );
};

// 基底に対して、UIのバリエーションを追加する。主に機能だけ使い回ししたい場合にバリエーションをb追加する
const Container = {
  Base,
  Basic: (
    props: Props & {
      color?: Color;
    },
  ) => {
    const { color = "secondary" } = props;
    return (
      <Base
        {...props}
        className={clsx(
          "container",
          color === "primary" &&
            "bg-primary-50 text-primary-950 hover:bg-primary-100",
          color === "secondary" &&
            "bg-secondary-50 text-secondary-950 hover:bg-secondary-100",
          props.className,
        )}
      />
    );
  },
  Floating: (
    props: Props & {
      color?: Color;
      position?: "bottom" | "top";
    },
  ) => {
    const { color = "secondary", position } = props;
    return (
      <Base
        {...props}
        className={clsx(
          "fixed mx-auto drop-shadow-lg",
          position === "top" && "top-0",
          position === "bottom" && "bottom-0",
          color === "primary" &&
            "bg-primary-50 text-primary-950 hover:bg-primary-100",
          color === "secondary" &&
            "bg-secondary-50 text-secondary-950 hover:bg-secondary-100 dark:bg-slate-950 dark:text-slate-50 dark:hover:bg-slate-950 dark:hover:text-slate-50",
          props.className,
        )}
      />
    );
  },
};

export { Container };
