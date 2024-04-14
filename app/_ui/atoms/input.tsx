import { Color, Rounded, Size } from "$/_ui";
import clsx from "clsx";
import React from "react";

export interface Props {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  title?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: number | readonly string[] | string | undefined;
}

const Base = ({
  autoFocus,
  className,
  name,
  onChange,
  pattern,
  placeholder,
  required,
  title,
  type,
  value,
}: Props) => {
  return (
    <input
      autoFocus={autoFocus}
      className={clsx(className)}
      name={name}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      required={required}
      title={title}
      type={type}
      value={value}
    />
  );
};

const Input = {
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
          "text-base outline-2 outline-offset-4 focus:outline",
          rounded === "full" && "rounded-full",
          color === "primary" &&
            "bg-primary-100 text-primary-900 outline-primary-400 placeholder:text-primary-400 hover:bg-primary-200",
          color === "secondary" &&
            "bg-secondary-100 text-secondary-700 outline-secondary-500 placeholder:text-secondary-400 hover:bg-secondary-200",
          color === "accent" &&
            "bg-accent-100 text-accent-950 outline-accent-400 placeholder:text-accent-400 hover:bg-accent-200",
          size === "md" && "h-16 w-full px-8",
          props.className,
        )}
      />
    );
  },
};

export { Input };
