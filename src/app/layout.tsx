import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";
import { I18nProvider } from "@/contexts/I18nContext";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgriChain - Blockchain-based Agricultural Marketplace",
  description: "A decentralized marketplace for agricultural products built on Polygon blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <WalletProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </WalletProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
