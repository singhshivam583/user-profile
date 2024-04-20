import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User-Profile",
  description: "Fetching User Profile from Api",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className}>
        <div className="relative w-full flex items-center justify-center">
          <Navbar/>
        </div>
          {children}
          <div className="">
            <Footer/>
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
