import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { dbConnect } from "@/app/lib/mongo";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import Providers from "./providers";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

const satoshiFont = localFont({
  src: [
    {
      path: "./assets/fonts/Satoshi-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/Satoshi-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/Satoshi-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/Satoshi-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/Satoshi-Black.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Fashion Store",
  description: "A modern fashion store with a wide range of trendy clothing and accessories for all styles and occasions.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conn = await dbConnect();
  // console.log(conn);
  return (
    <html lang="en">
      <body className={`${satoshiFont.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
