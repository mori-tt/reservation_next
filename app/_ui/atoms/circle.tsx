import { Color } from "$/_ui";
import clsx from "clsx";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
}

const Base = ({ children, className }: Props) => {
  return <div className={clsx(className)}>{children}</div>;
};

const Circle = {
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
          "rounded-full",
          color === "secondary" &&
            "bg-secondary-100 text-primary-950 hover:bg-secondary-200",
          props.className,
        )}
      />
    );
  },
};

export { Circle };
