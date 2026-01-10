import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { StockSearch } from "@/components/StockSearch";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AlphaDesk",
  description: "AI-Powered Market Intelligence",
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
          <header className="bg-background border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-xl">A</div>
                <h1 className="text-xl font-bold tracking-tight">AlphaDesk</h1>
              </Link>
              <div className="flex items-center gap-4">
                <StockSearch />
                <ModeToggle />
                <div className="text-xs font-mono text-gray-400 hidden sm:block">v0.1.0 MVP</div>
              </div>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}