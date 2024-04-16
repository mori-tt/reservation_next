import { WorldMap } from "$/WorldMap";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative flex h-[100dvh] content-center items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950",
      )}
    >
      <WorldMap className="absolute -right-32 h-[115svh] fill-slate-100/90 stroke-slate-950/5" />
      <main className="container relative z-10 flex h-[100dvh] flex-col content-center items-center justify-center gap-4 bg-slate-50/90 p-8 drop-shadow-2xl backdrop-blur before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] dark:bg-slate-950/90 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 md:max-h-[46rem] md:max-w-sm md:rounded">
        {children}
      </main>
    </div>
  );
}
