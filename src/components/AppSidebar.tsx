"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Settings, LineChart, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Market News",
    icon: Newspaper,
    href: "/news",
    color: "text-violet-500",
  },
  {
    label: "Analysis",
    icon: LineChart,
    href: "/analysis",
    color: "text-pink-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary/10 border-r border-border/40">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
             <Image fill alt="Logo" src="/logo.png" className="rounded-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold">
            AlphaDesk
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <SidebarContent />
      </div>

      <div className="md:hidden flex items-center p-4 border-b bg-background sticky top-0 z-50">
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
               <Button variant="ghost" size="icon">
                  <Menu />
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
               <SidebarContent />
            </SheetContent>
         </Sheet>
         <div className="ml-4 font-bold text-xl">AlphaDesk</div>
      </div>
    </>
  );
}
