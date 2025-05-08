import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Household Account Book",
  description: "家計簿アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-base text-secondary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
