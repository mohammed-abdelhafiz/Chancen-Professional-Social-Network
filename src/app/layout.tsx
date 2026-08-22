import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import TanstackQueryProvider from "@/components/providers/TanstackQueryProvider";
import { InitAuthProvider } from "@/components/providers/InitAuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

export const metadata: Metadata = {
  title: "Chancen",
  description:
    "The only one platform you need for social networking and connect with people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TanstackQueryProvider>
            <InitAuthProvider>
              <main>{children}</main>
            </InitAuthProvider>
            <Toaster richColors />
          </TanstackQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
