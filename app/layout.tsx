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

export const metadata: Metadata = {
  title: "Gulshan Kumar",
  description: "social media links",
  icons: {
    icon: [
      {
        url: "/ironman-4.jpg",
        type: "image/jpg",
        round: true,
      },
    ],
    shortcut: "/ironman-4.jpg",
    apple: [
      {
        url: "/ironman-4.jpg",
        sizes: "180x180",
        type: "image/jpg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
