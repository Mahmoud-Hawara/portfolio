import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { personal } from "@/data/portfolio";
import "./globals.css";
import "./portfolio-cards.css";
import "./portfolio-scenes.css";
import "./portfolio-engineering.css";
import "./portfolio-palette.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });
const display = Manrope({ variable: "--font-display", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1 };
export const metadata: Metadata = {
  title: `${personal.name} — Software Engineer`,
  description: "Software engineer at noon, previously at Microsoft. Building production software, teaching computer science, and competing at ICPC. Based in Cairo, Egypt.",
  authors: [{ name: personal.name }],
  openGraph: { title: `${personal.name} — Software Engineer`, description: personal.tagline, type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${display.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
