import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { TicketsProvider } from "@/contexts/TIcketsContext";
import { Toaster } from "sonner";
import { ChatBot } from "@/components/ui/ChatBot";
import { Suspense } from "react";

{/* Vercel Analytics */}
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-production-domain.com"), // Replace with your actual live domain (e.g., https://ticketlive.vercel.app)
  title: "TicketLive - Premium Concert Tickets",
  description:
    "Secure tickets for the best live events, concerts, and festivals.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "TicketLive - Premium Concert Tickets",
    description:
      "Secure tickets for the best live events, concerts, and festivals.",
    url: "https://your-production-domain.com", // Replace with your actual live domain
    siteName: "TicketLive",
    images: [
      {
        url: "https://res.cloudinary.com/dkcefbwq0/image/upload/v1794269992/Gemini_Generated_Image_e9n3jge9n3jge9n3_sispxm.jpg",
        width: 1200,
        height: 627,
        alt: "TicketLive - Vive lo extraordinario",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketLive - Premium Concert Tickets",
    description:
      "Secure tickets for the best live events, concerts, and festivals.",
    images: [
      "https://res.cloudinary.com/dkcefbwq0/image/upload/v1794269992/Gemini_Generated_Image_e9n3jge9n3jge9n3_sispxm.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <TicketsProvider>
                <Suspense fallback={null}>
                  <Navbar />
                  {children}
                  <Analytics />
                  <SpeedInsights />
                  <Footer />
                  <Toaster position="top-right" richColors />
                </Suspense>
              </TicketsProvider>
            </FavoritesProvider>
            <ChatBot />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
