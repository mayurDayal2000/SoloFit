import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  authors: [{ name: "mayurDayal2000", url: "https://github.com/mayurDayal2000" }],
  description:
    "A gamified fitness app inspired by Solo Leveling, designed to guide you to your dream physique through personalized daily challenges.",
  title: "SoloFit: Level Up Your Body",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableColorScheme enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
