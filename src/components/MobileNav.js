
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Archive,
  CalendarDays,
  Settings,
} from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const items = [
    {
      label: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Leads",
      href: "/leads",
      icon: Users,
    },
    {
      label: "Archive",
      href: "/archived-leads",
      icon: Archive,
    },
    {
      label: "Visits",
      href: "/site-visits",
      icon: CalendarDays,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="md:hidden sticky top-0 z-50 mb-4">
  <div className="flex justify-around items-center py-3">

        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition ${
              active
? "text-green-600 font-semibold"
: "text-slate-500" 
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

      </div>

    </div>
  );
}

