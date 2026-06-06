
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

import {
  LayoutDashboard,
  Users,
  Archive,
  CalendarDays,
  BarChart3,
  Settings,
  SunMedium,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Leads",
      icon: Users,
      href: "/leads",
    },
    {
      name: "Archived Leads",
      icon: Archive,
      href: "/archived-leads",
    },
    {
      name: "Site Visits",
      icon: CalendarDays,
      href: "/site-visits",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 min-h-screen bg-white border-r border-slate-200 p-6">

      <div className="mb-10">

        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 flex items-center justify-center text-white">
            <SunMedium size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">
              SolarSync
            </h1>

            <p className="text-sm text-slate-500">
              Smart Solar CRM
            </p>
          </div>
        </div>

      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-medium ${
                active
                  ? "bg-green-500 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-slate-200">
        <LogoutButton />
      </div>
    </aside>
  );
}

