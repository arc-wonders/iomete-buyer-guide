import type { Metadata } from "next";
import { Archivo, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/landing.css";
import "@/styles/security-review.css";
import "@/styles/what-it-costs.css";
import "@/styles/why-not-saas.css";
import "@/styles/what-gets-installed.css";
import "@/styles/how-hard-to-run.css";
import "@/styles/where-data-goes.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "IOMETE",
  description: "A sovereign data lakehouse, explained for the engineer who runs it, the risk officer who signs it off, and the executive who pays for it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
