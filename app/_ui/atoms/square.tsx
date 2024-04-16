import { Color, Rounded, Tone } from "$/_ui";
import clsx from "clsx";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Base = ({ children, className }: Props) => {
  return <div className={clsx(className)}>{children}</div>;
};

const Square = {
  Base,
  Basic: (
    props: Props & {
      color?: Color;
      rounded?: Rounded;
      tone?: Tone;
    },
  ) => {
    const { color = "secondary", rounded, tone } = props;
    return (
      <Base
        {...props}
        className={clsx(
          rounded === "xl" && "rounded-xl",
          color === "secondary" &&
            tone === "50" &&
            "bg-secondary-50 text-secondary-950 hover:bg-secondary-100",
          color === "secondary" &&
            tone === "100" &&
            "bg-secondary-100 text-secondary-950 hover:bg-secondary-200",
          color === "secondary" &&
            tone === undefined &&
            "bg-secondary-600 text-secondary-50 hover:bg-secondary-700",
          color === "success" &&
            "bg-success-500 text-success-50 hover:bg-success-600",
          color === "danger" &&
            color === "danger" &&
            "bg-danger-500 text-danger-50 hover:bg-danger-600",
          props.className,
        )}
      />
    );
  },
};

export { Square };
