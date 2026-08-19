import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import { InitAuthProvider } from "@/components/providers/InitAuthProvider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Chancen",
  description:
    "The only one platform you need for social networking and connect with people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        outfit.variable,
        interHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TanstackQueryProvider>
          <InitAuthProvider>
            <main>{children}</main>
          </InitAuthProvider>
          <Toaster richColors />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
