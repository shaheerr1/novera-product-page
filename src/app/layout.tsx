import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "@/styles/main.scss";

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novera | Twill Overshirt",
  description: "Novera Twill Overshirt product page",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
