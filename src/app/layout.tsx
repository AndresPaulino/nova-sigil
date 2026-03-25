import type { Metadata } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/lib/SmoothScroll";
import { BackgroundCanvas } from "@/components/three/BackgroundCanvas";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { PageLoader } from "@/components/ui/PageLoader";
import "./globals.css";

const headline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["300", "400", "500", "600", "700"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["200", "300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["200", "300"],
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
      className={`dark ${headline.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-body font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-black focus:font-bold focus:outline-none"
        >
          Skip to content
        </a>
        <PageLoader />
        <BackgroundCanvas />
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <div className="relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
