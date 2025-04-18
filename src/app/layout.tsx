import type { Metadata } from "next";
import { Lora, Fira_Code } from "next/font/google";
import "./globals.css";

const victorMono = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Our lives in weeks",
  description:
    "See our lives in weeks. Inspired by Tim Urban's Your Life in Weeks (Wait But Why) and Buster Benson's Life in Weeks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${victorMono.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  );
}
