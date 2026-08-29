import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import { InitAuthProvider } from "@/components/providers/InitAuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#181424" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Chancen — Professional Social Network",
    template: "%s | Chancen",
  },
  description:
    "Connect with professionals, discover job opportunities, share knowledge, and build your career on Chancen.",
  keywords: [
    "social network",
    "professional network",
    "careers",
    "jobs",
    "tech hiring",
    "networking",
    "portfolio",
    "connections",
  ],
  authors: [{ name: "Chancen Team" }],
  creator: "Chancen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Chancen",
    title: "Chancen — Connect, Grow, and Discover Opportunities",
    description:
      "A modern professional networking platform designed to connect talent with opportunities and foster knowledge sharing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chancen — Professional Social Network",
    description:
      "Connect with industry professionals, share insights, and discover your next career milestone on Chancen.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        outfit.variable,
        interHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider>
          <TanstackQueryProvider>
            <InitAuthProvider>
              <main className="flex-1 flex flex-col">{children}</main>
            </InitAuthProvider>
            <Toaster richColors position="top-right" />
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
