import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { AmbientMesh } from "@/components/background/ambient-mesh";
import { GrainOverlay } from "@/components/background/grain-overlay";
import { PageIntro } from "@/components/motion/page-intro";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BackToTop } from "@/components/ui/back-to-top";
import { Header } from "@/components/layout/header";
import { AnimatedFooter } from "@/components/layout/animated-footer";
import { personal } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const heading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${personal.name} · Software Engineer`,
  description: personal.tagline,
  keywords: [
    "Software Engineer",
    "Competitive Programming",
    "ICPC",
    "Azure",
    "Backend",
    personal.name,
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    title: `${personal.name} · Portfolio`,
    description: personal.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${heading.variable} ${mono.variable} h-full scroll-smooth`}
    >
      <body className="relative flex min-h-full max-w-[100vw] flex-col font-sans">
        <ThemeProvider>
          <AmbientMesh />
          <GrainOverlay />
          <TooltipProvider>
            <PageIntro>
              <ScrollProgress />
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
              >
                Skip to content
              </a>
              <Header />
              <main id="main-content" className="relative z-[1] flex-1">
                {children}
              </main>
              <AnimatedFooter />
              <BackToTop />
            </PageIntro>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
