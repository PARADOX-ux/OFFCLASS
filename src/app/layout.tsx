import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import "./night-studio.css";
import "./night-studio-components.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ScrollFX from "@/components/ScrollFX";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://offclass-six.vercel.app"),
  title: {
    default: "OFFCLASS — Build Your Life Beyond the Classroom",
    template: "%s | OFFCLASS",
  },
  description:
    "OFFCLASS helps students learn useful skills, find opportunities, earn money, build careers, and navigate college — all in one place.",
  keywords: [
    "student platform",
    "earn money college",
    "student skills",
    "internships",
    "career building",
    "college life",
    "student opportunities",
    "financial literacy students",
  ],
  authors: [{ name: "OFFCLASS" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "OFFCLASS",
    title: "OFFCLASS — Build Your Life Beyond the Classroom",
    description:
      "Practical tools, knowledge, and opportunities to help students build financial, professional, and personal independence.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "OFFCLASS — Build Your Life Beyond the Classroom",
    description:
      "Practical tools, knowledge, and opportunities to help students build financial, professional, and personal independence.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
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
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('offclass-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ScrollFX />
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" className="flex-1 pt-[72px]">
              {children}
            </main>
            <Footer />
          </AuthProvider>
          {process.env.NEXT_PUBLIC_VERCEL_ENV && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}