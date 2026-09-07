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
  title: "The Wedding of Budi & Sari",
  description:
    "We joyfully invite you to celebrate our wedding. Saturday, November 15th, 2025.",
  openGraph: {
    title: "The Wedding of Budi & Sari",
    description: "You are cordially invited to celebrate our special day.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Budi & Sari",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${alexBrush.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="bg-[#FBF8F3] text-[#2C251E] font-sans antialiased selection:bg-[#C5A869] selection:text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
