import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEO Jobs Pune — Fresher & Junior SEO Opportunities",
    template: "%s | SEO Jobs Pune",
  },
  description:
    "Discover verified SEO Executive, Analyst, Trainee & Digital Marketing fresher jobs in Pune, Hinjawadi, Baner, Kharadi & Remote. 100% genuine verified application links.",
  keywords: [
    "SEO jobs in Pune",
    "Fresher SEO jobs Pune",
    "SEO Executive Pune",
    "SEO Analyst fresher",
    "Digital marketing jobs Pune",
    "SEO internships Pune",
    "Technical SEO Pune",
    "Baner SEO jobs",
    "Hinjawadi digital marketing",
  ],
  authors: [{ name: "SEO Jobs Pune Team" }],
  creator: "SEO Jobs Pune",
  metadataBase: new URL("https://seojobspune.in"),
  openGraph: {
    title: "SEO Jobs Pune — Fresher & Junior SEO Opportunities",
    description:
      "Find every relevant SEO job in Pune, understand the requirements, quickly decide whether you are eligible, and apply directly.",
    url: "https://seojobspune.in",
    siteName: "SEO Jobs Pune",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Jobs Pune — Fresher & Junior SEO Opportunities",
    description: "Verified SEO, Digital Marketing, and Fresher Jobs in Pune, Maharashtra.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-100 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
