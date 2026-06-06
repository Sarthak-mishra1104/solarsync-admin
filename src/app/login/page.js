"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(5,15,35,0.55), rgba(5,15,35,0.75)), url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2000&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Glow Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl">

          <div className="text-center">

            <div className="text-6xl mb-4">
              ☀️
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">
              SolarSync Admin
            </h1>

            <p className="text-gray-200 mb-8">
              Smart Solar CRM & Lead Management Platform
            </p>

            <button
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/dashboard",
                })
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Continue with Google
            </button>

            <p className="text-xs text-gray-300 mt-6">
              Authorized access only • SolarSync Technologies
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

