"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="flex items-center gap-3 p-4 rounded-2xl text-gray-700 hover:bg-green-100 transition-all w-full text-left font-medium"
    >
      <span className="text-xl">🚪</span>
      Logout
    </button>
  );
}