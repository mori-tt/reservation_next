import { Color, Rounded, Size } from "$/_ui";
import clsx from "clsx";
import React from "react";

export interface Props {
  children?: React.ReactNode;
  className?: string;
  form?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit" | undefined;
  value?: number | readonly string[] | string;
}

// ロジックは基底のButtonに集約する、コピーして新しくコンポーネントを作る時もUIのバリエーション側でエラーが出づらい
const Base = ({
  children,
  className,
  form,
  onClick,
  onSubmit,
  type = "button",
  value,
}: Props) => {
  // const { startProgress } = useProgress();
  return (
    <button
      className={clsx(className)}
      form={form}
      onClick={onClick}
      onSubmit={onSubmit}
      // onSubmit={(e) => { startProgress(); onSubmit && onSubmit(e); e.preventDefault(); }}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

// 基底のButtonに対して、UIのバリエーションを追加する。主に機能だけ使い回ししたい場合にバリエーションをb追加する
const Button = {
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
      // 対応しているオプションのみ追加する
      rounded?: Rounded;
      size?: Size;
    },
  ) => {
    const { color = "secondary", rounded = "full", size = "md" } = props;
    return (
      <Base
        {...props}
        className={clsx(
          "text-center text-base font-bold outline-2 outline-offset-4 transition-transform delay-0 duration-75 ease-out focus:outline active:scale-95 active:outline",
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
  // バリエーション追加の例
  // - Outline 反転表示
  // - Simple 初期表示は文字のみ、背景色なし、hoverで背景色が表示される
  // - Underline 初期表示は文字のみ、背景色なし、hoverで下線が表示される
};

// それぞれのボタンの見た目は、基底のButtonに対して、バリエーションを追加する
export { Button };
