"use client"; // cosmosのために追加
import clsx from "clsx";

// TODO: この辺りの問題があるため、他のatomなどと同様にオブジェクトで複数コンポーネントを返せない https://github.com/vercel/next.js/issues/41940

export interface Props {
  className?: string;
  disabledTimeList?: string[];
  onChange?: (unixTime: number, value: string) => void;
  reservedTimeList?: string[];
  splitMinute?: number;
  unixTime?: number;
}

const toHhMm = (date: Date) => {
  const localeTimeString = date.toLocaleTimeString();
  return localeTimeString.length > 7
    ? localeTimeString.substring(0, 5)
    : localeTimeString.substring(0, 4);
};

const Base = ({
  className,
  disabledTimeList,
  onChange,
  reservedTimeList,
  splitMinute = 60,
  unixTime,
}: Props) => {
  const value = toHhMm(new Date(unixTime || new Date()));
  const timelines = Array.from({ length: (12 * 60) / splitMinute });
  return (
    <ul className={clsx("relative flex max-w-md flex-col", className)}>
      {timelines.map((_value, index) => {
        const date = new Date(1900, 1 - 1, 1, 9, splitMinute * index, 0);
        const time = toHhMm(date);
        return (
          <li
            className="flex flex-row content-center items-center px-4 py-2 odd:bg-slate-50/80 even:bg-slate-100/80 dark:odd:bg-slate-900/80 dark:even:bg-slate-950/80"
            key={index}
          >
            <div className="w-16 pr-4 text-right text-sm font-black text-slate-500">
              {time}
            </div>
            <div className="w-full">
              {reservedTimeList !== undefined &&
              reservedTimeList.includes(time) ? (
                <div className="flex h-12 content-center items-center justify-center rounded-xl bg-error-500 text-sm font-bold text-white">
                  予約済み
                </div>
              ) : disabledTimeList !== undefined &&
                disabledTimeList.includes(time) ? (
                <div className="flex h-12 content-center items-center justify-center rounded-xl bg-slate-400 text-sm font-bold text-white">
                  予約不可
                </div>
              ) : value !== undefined && value === time ? (
                <div className="flex h-12 content-center items-center justify-center rounded-xl bg-green-400 text-sm font-bold text-white">
                  選択中
                </div>
              ) : (
                <button
                  className="h-12 w-full"
                  onClick={() => {
                    const newDate = new Date(unixTime || new Date());
                    newDate.setHours(date.getHours());
                    newDate.setMinutes(date.getMinutes());
                    newDate.setMilliseconds(0);
                    newDate.setSeconds(0);
                    onChange && onChange(newDate.getTime(), time);
                  }}
                  type="button"
                >
                  &nbsp;
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const Timeline = {
  Base,
};

export const TimelineBase = Timeline.Base;
