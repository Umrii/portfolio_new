import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anasatiq.com"),
  title: "Anas Atiq — Data Engineer & Python Developer | Newcastle, UK",
  description:
    "Anas Atiq — Data Engineer and MSc Data Science student at Northumbria University. Specialising in FastAPI, Python pipelines, and real-time data systems. Open to UK roles.",
  openGraph: {
    title: "Anas Atiq — Data Engineer",
    description:
      "Building data pipelines at the intersection of energy markets and automation.",
    url: "https://anasatiq.com",
    siteName: "Anas Atiq",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anas Atiq — Data Engineer",
    description:
      "Building data pipelines at the intersection of energy markets and automation.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background font-sans text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
