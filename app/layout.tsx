import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "The Wedding of Jacob & Ghina | #withCob",
  description:
    "We joyfully invite you to celebrate our holy matrimony and wedding celebration. Saturday, May 02nd, 2026.",
  openGraph: {
    title: "The Wedding of Jacob & Ghina | #withCob",
    description: "You are cordially invited to celebrate the holy matrimony and wedding celebration of Jacob & Ghina.",
    type: "website",
    siteName: "The Wedding of Jacob & Ghina",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Jacob & Ghina | #withCob",
    description: "You are cordially invited to celebrate the holy matrimony and wedding celebration of Jacob & Ghina.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${alexBrush.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="bg-[#FBF8F3] text-[#2C251E] font-sans antialiased selection:bg-[#7A5E24] selection:text-[#FFFFFF]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
