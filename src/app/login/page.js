"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FFFA]">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[450px]">

        <h1 className="text-4xl font-bold mb-3">
          ☀ SolarSync Admin
        </h1>

        <p className="text-gray-500 mb-8">
          Sign in to access the CRM dashboard
        </p>

        <button
          onClick={() =>
  signIn("google", {
    callbackUrl: "/dashboard",
  })
}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium"
        >
          Sign in with Google
        </button>

      </div>

    </div>
  );
}