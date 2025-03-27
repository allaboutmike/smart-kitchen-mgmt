import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import SideNavBar from "@/components/SideNavBar";
import Chatbot from "@/components/Chatbot";
import { ChatbotProvider } from "./configs/chatbot-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dine Flow",
  description: "Restaurant management solution",
  icons: {
    icon: "/DF-hq-1.svg",
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
        <ChatbotProvider>
          {children}
          <SideNavBar />
          <Chatbot />
          <Footer />
        </ChatbotProvider>
      </body>
    </html>
  );
}