import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Postres caseros`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "postres caseros",
    "chocotorta",
    "bomba oreo",
    "bocaditos dulces",
    "batidos",
    "gelatinas",
    "postres Paraná",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — Postres caseros`,
    description: site.description,
    type: "website",
    locale: "es_AR",
    siteName: site.name,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — Postres caseros`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
