import Sidebar from "@/components/Sidebar";

export default function SiteVisits() {
  return (
    <div className="min-h-screen flex bg-[#F8FFFA]">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">
          📅 Site Visits
        </h1>

        <div className="bg-white rounded-3xl p-8 shadow">
          No site visits scheduled yet.
        </div>
      </main>
    </div>
  );
}