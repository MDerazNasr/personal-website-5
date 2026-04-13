import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Mohamed Deraz Nasr",
  description:
    "Machine learning engineer and researcher building systems across modeling, infrastructure, and modern web products."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>{children}</body>
    </html>
  );
}
