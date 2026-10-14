import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mono = localFont({
  src: [
    { path: "../fonts/general-sans/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/general-sans/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-light-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reshma Mulik // Photographer",
  description:
    "Reshma is a documentary photographer showcasing stories, portraits and fashion work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mono.variable} font-light-mono min-h-screen bg-[#f5f5dc] text-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
