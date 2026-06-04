"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    phone: "",
    whatsapp: "",
    address: "",
    logo: "",
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();

        setForm({
          companyName: data.companyName || "",
          companyEmail: data.companyEmail || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          address: data.address || "",
          logo: data.logo || "",
        });
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  async function saveSettings(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert("Settings saved successfully");
      } else {
        alert("Failed to save settings");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FFFA] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FFFA] flex">
      <Sidebar />

      <main className="flex-1 p-8">

        <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold">
            ⚙️ Settings
          </h1>

          <p className="text-green-100 mt-2">
            Manage your company information
          </p>
        </div>

        <form
          onSubmit={saveSettings}
          className="bg-white rounded-3xl shadow-lg p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Company Name
            </label>

            <input
              type="text"
              value={form.companyName}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyName: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company Email
            </label>

            <input
              type="email"
              value={form.companyEmail}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyEmail: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="text"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              WhatsApp Number
            </label>

            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) =>
                setForm({
                  ...form,
                  whatsapp: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Office Address
            </label>

            <textarea
              rows="4"
              value={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Logo URL
            </label>

            <input
              type="text"
              value={form.logo}
              onChange={(e) =>
                setForm({
                  ...form,
                  logo: e.target.value,
                })
              }
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium"
          >
            Save Settings
          </button>

        </form>

      </main>
    </div>
  );
}