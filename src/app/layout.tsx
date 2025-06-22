import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
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
  title: "Golgappa King",
  description: "Golgappa King Private Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-yellow-400`}>
        <Navbar/>
        <main className="pt-20"> {/* ← add padding for fixed navbar height */}
          {children}
        </main>
      </body>
    </html>
  );
}
