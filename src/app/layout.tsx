import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlphaDesk",
  description: "Personal Financial Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-full relative flex min-h-screen bg-background">
             {/* Sidebar (Fixed on Desktop, Hidden on Mobile) */}
             <AppSidebar />
             
             {/* Main Content Area - Shifted Right on Desktop */}
             <main className="flex-1 md:pl-72 transition-all duration-300 ease-in-out">
               {children}
             </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
