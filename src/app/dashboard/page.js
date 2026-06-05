import MobileNav from "@/components/MobileNav";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Sidebar from "@/components/Sidebar";

async function getDashboardData() {
  await connectDB();

  const totalLeads = await Lead.countDocuments();

  const activeLeads = await Lead.countDocuments({
    $or: [
      { isArchived: false },
      { isArchived: { $exists: false } },
    ],
  });

  const archivedLeads = await Lead.countDocuments({
    isArchived: true,
  });

  const siteVisits = await Lead.countDocuments({
    siteVisitDate: {
      $exists: true,
      $ne: null,
    },
  });

  const completedVisits = await Lead.countDocuments({
    visitCompleted: true,
  });

  const conversions = await Lead.countDocuments({
    status: "Converted",
  });

  const recentLeads = await Lead.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return {
    totalLeads,
    activeLeads,
    archivedLeads,
    siteVisits,
    completedVisits,
    conversions,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)),
  };
}


export default async function Dashboard() {
  const data = await getDashboardData();

  return (
    <div className="min-h-screen bg-[#F8FFFA] md:flex">
      <Sidebar />

      <main className="flex-1 p-3 md:p-8 overflow-x-hidden">
        <MobileNav />

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl p-4 text-white mb-4">
          <p className="text-green-100 text-sm mb-1">
            ☀ SolarSync Admin
          </p>

          <h1 className="text-2xl md:text-5xl font-bold mb-2">
            Welcome Back 👋
          </h1>

          <p className="hidden md:block text-lg text-green-50">
            Manage leads, site visits, proposals and solar sales
            from one powerful dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">

          <div className="bg-white rounded-xl shadow p-3 border border-green-100">
            <div className="text-2xl mb-1">👥</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Total Leads
            </h3>
            <p className="text-xl md:text-4xl font-bold text-green-600 mt-1">
              {data.totalLeads}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 border border-blue-100">
            <div className="text-2xl mb-1">🟢</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Active
            </h3>
            <p className="text-xl md:text-4xl font-bold text-blue-600 mt-1">
              {data.activeLeads}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 border border-gray-100">
            <div className="text-2xl mb-1">📦</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Archive
            </h3>
            <p className="text-xl md:text-4xl font-bold text-gray-600 mt-1">
              {data.archivedLeads}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 border border-yellow-100">
            <div className="text-2xl mb-1">📅</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Visits
            </h3>
            <p className="text-xl md:text-4xl font-bold text-yellow-600 mt-1">
              {data.siteVisits}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 border border-indigo-100">
            <div className="text-2xl mb-1">✅</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Done
            </h3>
            <p className="text-xl md:text-4xl font-bold text-indigo-600 mt-1">
              {data.completedVisits}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-3 border border-emerald-100">
            <div className="text-2xl mb-1">⚡</div>
            <h3 className="text-xs md:text-base text-gray-500">
              Converted
            </h3>
            <p className="text-xl md:text-4xl font-bold text-emerald-600 mt-1">
              {data.conversions}
            </p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-2xl shadow p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold mb-4">
            Recent Activity
          </h3>

          <div className="space-y-3">
            {data.recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="bg-green-50 border border-green-100 rounded-xl p-3 hover:bg-green-100 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                      👤 {lead.name}
                    </h4>

                    <p className="text-gray-500 text-xs md:text-sm">
                      📍 {lead.city || "Unknown City"}
                    </p>
                  </div>

                  <div className="text-xs md:text-sm text-green-600 font-medium">
                    {lead.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}

