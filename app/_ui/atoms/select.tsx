import { Size } from "$/_ui";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  value?: number | readonly string[] | string | undefined;
}

const Base = ({ children, className, onChange, placeholder, value }: Props) => {
  return (
    <select
      className={clsx(className)}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    >
      {children}
    </select>
  );
};

const Option = ({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: number | readonly string[] | string | undefined;
}) => {
  return <option value={value}>{children}</option>;
};

const Select = {
  Base,
  Transparent: (props: Props & { size?: Size }) => {
    const { size = "sm" } = props;
    return (
      <div className="relative w-min">
        <Base
          {...props}
          className={clsx(
            "block w-min appearance-none bg-transparent px-2  outline-2 outline-offset-4 outline-secondary-500 placeholder:text-secondary-400 hover:bg-secondary-950/25 focus:outline",
            size === "sm" && "pr-4 text-sm",
            size === "xl" && "pr-6 text-xl font-black",
            size === "5xl" && "pr-9 text-5xl",
            props.className,
          )}
        />
        <div className="pointer-events-none absolute right-0 top-0 h-full">
          <ChevronUpDownIcon className="h-full text-secondary-200" />
        </div>
      </div>
    );
  },
};

export { Option, Select };
