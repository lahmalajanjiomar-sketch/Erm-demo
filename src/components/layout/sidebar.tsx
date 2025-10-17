"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  BrainCircuit,
  CalendarClock,
  LayoutDashboard,
  LucideIcon,
  ShoppingCart,
  Wrench,
  Factory,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/inventory", icon: Boxes, label: "Inventory" },
  { href: "/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/production", icon: CalendarClock, label: "Production" },
  { href: "/maintenance", icon: Wrench, label: "Maintenance" },
  { href: "/predictive-maintenance", icon: BrainCircuit, label: "AI Predictions" },
];

type NavLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const NavLink = ({ href, icon: Icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} legacyBehavior passHref>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-card md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Factory className="h-6 w-6 text-primary" />
            <span className="">FactoryFlow</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
