import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const headline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["300", "400", "500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nova Sigil — Software Development Studio",
  description:
    "Award-caliber software development studio. We craft digital experiences with precision and intention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${headline.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-on-surface font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-md focus:bg-primary-container focus:px-4 focus:py-2 focus:text-on-primary focus:font-bold focus:outline-none"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
