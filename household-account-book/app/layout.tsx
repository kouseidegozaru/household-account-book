import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}
