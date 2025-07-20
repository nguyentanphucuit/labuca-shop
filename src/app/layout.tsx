import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import ShippingAnnouncement from "@/app/components/ShippingAnnouncement";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Cart from "./components/Cart";
import ProgressBarProvider from "./components/ProgressBar";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

import { Suspense } from "react";
import { classNames } from "./constants/common";
import styles from "./page.module.css";

import Header from "./components/Header";
import SpeedDial from "./components/SpeedDial";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Labuca - Giày Dép và Túi xách nữ thời trang",
  description: "Labuca - Giày Dép và Túi xách nữ thời trang",
  keywords:
    "labuca, labuca.vn, labu, giày thời trang, giày cao gót, giày thể thao, giày sneaker, giày công sở, giày đẹp, giày giá rẻ, giày chính hãng, shop giày, mua giày online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body className={classNames(styles.main, inter.className)}>
        <GoogleTagManager gtmId="GTM-5CXDKNWS" />
        <CartProvider>
          <ShippingAnnouncement />
          <Navbar />
          <main className="pt-36">
            <Suspense>
              <ProgressBarProvider>{children}</ProgressBarProvider>
            </Suspense>
          </main>
          <SpeedDial />
          <Footer />
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}
