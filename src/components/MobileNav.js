"use client";

import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="md:hidden sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex justify-around items-center py-3 text-xs font-medium">
        <Link href="/dashboard">📊 Dashboard</Link>
        <Link href="/leads">👥 Leads</Link>
        <Link href="/archived-leads">📦 Archive</Link>
        <Link href="/site-visits">📅 Visits</Link>
        <Link href="/settings">⚙️ Settings</Link>
      </div>
    </div>
  );
}