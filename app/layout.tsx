import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/config";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.name} — ${config.roles[0]}`,
  description: config.tagline,
  openGraph: {
    title: `${config.name} — ${config.roles[0]}`,
    description: config.tagline,
    url: config.siteUrl,
    siteName: config.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} — ${config.roles[0]}`,
    description: config.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col">{children}</body>
    </html>
  );
}
