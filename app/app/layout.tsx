import type { Metadata } from "next";
import { Archivo, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "IOMETE, explained for you",
  description: "A sovereign data lakehouse, explained for the engineer who runs it, the risk officer who signs it off, and the executive who pays for it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
