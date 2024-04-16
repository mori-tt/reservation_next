import { Container } from "$/_ui/atoms/container";
import { WorldMap } from "$/WorldMap";
import clsx from "clsx";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div
        className={clsx(
          "relative flex h-full justify-center overflow-hidden overflow-y-auto bg-slate-50 pb-28 pt-20 dark:bg-slate-950",
        )}
      >
        <Container.Floating
          className="z-20 flex w-screen flex-row items-center justify-between px-6 py-5"
          color="secondary"
          id="header"
          position="top"
        ></Container.Floating>
        <WorldMap className="fixed -right-32 -top-20 h-[115svh] fill-slate-100/90 stroke-slate-950/5" />
        <main className="container relative z-10 bg-white p-4 shadow-xl before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] dark:bg-slate-950 before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 md:max-h-fit md:min-w-fit md:max-w-md md:rounded">
          {children}
        </main>
        <Container.Floating
          className="z-20 w-screen px-6 py-5"
          color="secondary"
          id="footer"
          position="bottom"
        ></Container.Floating>
        {modal}
      </div>
    </>
  );
}
