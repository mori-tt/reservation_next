import "$/globals.css";
import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  description: "Simple Online Reservation App.",
  title: "Online Reservation System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={clsx(inter.className)}>{children}</body>
    </html>
  );
}
