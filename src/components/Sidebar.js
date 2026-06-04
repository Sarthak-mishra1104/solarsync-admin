"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "📊",
      href: "/dashboard",
    },
    {
      name: "Leads",
      icon: "👥",
      href: "/leads",
    },
    {
  name: "Archived Leads",
  icon: "📦",
  href: "/archived-leads",
},
    {
  name: "Site Visits",
  icon: "📅",
  href: "/site-visits",
},
{
  name: "Analytics",
  icon: "📈",
  href: "/analytics",
},
{
  name: "Settings",
  icon: "⚙️",
  href: "/settings",
},
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#ECFDF3] border-r border-green-100 p-6">

      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Solar<span className="text-green-500">Sync</span>
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Smart Solar Management
        </p>
      </div>

      <nav className="space-y-3">

        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-medium
              ${
                pathname === item.href
                  ? "bg-green-200 text-green-800 shadow-sm"
                  : "text-gray-700 hover:bg-green-100"
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </Link>
        ))}

      </nav>

      <div className="mt-12 p-5 rounded-3xl bg-gradient-to-br from-green-400 to-green-500 text-white">
<div className="mt-6">
  <LogoutButton />
</div>
        <h3 className="font-bold text-lg">
          ☀ SolarSync AI
        </h3>

        <p className="text-sm mt-2 text-green-50">
          Manage leads, visits and solar sales from one place.
        </p>

      </div>

    </aside>
  );
}