import type { Metadata } from "next";
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

const siteUrl = "https://obol.fixr.nexus";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Obol \u2014 Agent-to-Agent x402 Payments on Monad",
    template: "%s | Obol",
  },
  description:
    "Pay the ferryman. Agent-to-agent x402 micropayments routed through bonding curves on Monad. Every API call = buy pressure. Three chains: Base, Solana, Monad.",
  keywords: [
    "x402",
    "agent payments",
    "bonding curve",
    "Monad",
    "micropayments",
    "agent-to-agent",
    "HTTP 402",
    "USDC",
    "DeFi",
    "Fixr",
    "Obol",
    "pay-per-call",
    "API payments",
  ],
  authors: [{ name: "Fixr", url: "https://fixr.nexus" }],
  creator: "Fixr",
  openGraph: {
    title: "Obol \u2014 Agent-to-Agent x402 Payments",
    description:
      "Pay the ferryman. x402 micropayments on Monad. Every API call buys bonding curve tokens.",
    siteName: "Obol",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Obol \u2014 Pay the ferryman. Agent-to-agent x402 payments on Monad.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obol \u2014 Agent-to-Agent x402 Payments",
    description:
      "Pay the ferryman. x402 micropayments routed through bonding curves on Monad.",
    images: ["/og"],
    creator: "@fixr_nexus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#09090b] text-zinc-50 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
