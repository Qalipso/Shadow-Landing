import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Spectral } from "next/font/google";
import "./globals.css";

// ── Fonts ──────────────────────────────────────────────────────────────────
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});


// ── Metadata ───────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Shadow — AI Second Brain for Memory, Life Analytics and Clarity",
  description:
    "Shadow is an AI personal operating system that captures thoughts, tasks, emotions and daily signals, turns them into living memory and helps you see patterns across your life.",
  metadataBase: new URL("https://shadow.so"),
  openGraph: {
    siteName: "Shadow",
    type: "website",
    title: "Shadow — Stop holding your whole life in your head.",
    description:
      "Capture thoughts, tasks, emotions and daily signals. Shadow turns them into living memory you can navigate.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadow — Stop holding your whole life in your head.",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadow — Stop holding your whole life in your head.",
    description:
      "Capture thoughts, tasks, emotions and daily signals. Shadow turns them into living memory you can navigate.",
    images: [
      {
        url: "/og-image.png",
        alt: "Shadow — Stop holding your whole life in your head.",
      },
    ],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/assets/shady-final.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

// ── JSON-LD structured data ────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Shadow",
  description:
    "AI personal operating system that captures thoughts, tasks, emotions and daily signals, turns them into living memory and helps you see patterns across your life.",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  url: "https://shadow.so",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

// ── Root layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${spectral.variable}`}
    >
      <head>
        {/* General Sans — async load to avoid render-blocking */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap';document.head.appendChild(l)}()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
