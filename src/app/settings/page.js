import Sidebar from "@/components/Sidebar";

export default function Settings() {
  return (
    <div className="min-h-screen flex bg-[#F8FFFA]">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">
          ⚙️ Settings
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow">
          Configure SolarSync settings here.
        </div>
      </main>
    </div>
  );
}