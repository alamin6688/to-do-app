"use client";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Nabar";
import Footer from "@/components/shared/Footer";
import AuthProider from "@/contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  // const pathName = usePathname();
  // const hideNavAndFooter =
  //   pathName === "/login" ||
  //   pathName === "/signup" ||
  //   pathName === "/dashboard";
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProider>
          <Navbar />
          {children}
          <Footer />
          <Toaster/>
        </AuthProider>
      </body>
    </html>
  );
}
