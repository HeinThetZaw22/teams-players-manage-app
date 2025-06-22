import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./redux";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soccer",
  description: "Codigo test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <QueryProvider>
          <StoreProvider>
            <main className=" h-full flex flex-col justify-between">
              <div className=" flex-grow">
                {children}
                <Toaster position="top-center" />
              </div>
            </main>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
