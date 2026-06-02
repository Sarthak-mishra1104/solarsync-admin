import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Sidebar from "@/components/Sidebar";
async function getDashboardData() {
  await connectDB();

  const totalLeads = await Lead.countDocuments();

  const recentLeads = await Lead.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return {
    totalLeads,
    recentLeads: JSON.parse(JSON.stringify(recentLeads)),
  };
}

export default async function Dashboard() {
    const data = await getDashboardData();
  return (
   <div className="min-h-screen bg-[#F8FFFA] flex">

  <Sidebar /> 
    

      {/* Main Content */}
      <main className="flex-1 p-8">
        
       <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl p-8 text-white mb-8">

  <p className="text-green-100 mb-2">
    ☀ SolarSync Admin
  </p>

  <h1 className="text-5xl font-bold mb-4">
    Welcome Back, Sarthak 👋
  </h1>

  <p className="text-lg text-green-50">
    Manage leads, site visits, proposals and solar sales
    from one powerful dashboard.
  </p>

</div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <div className="text-4xl mb-3">👥</div>

            <h3 className="text-gray-500">
              Total Leads
            </h3>

            <p className="text-4xl font-bold text-orange-500 mt-2">
             {data.totalLeads}
 
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100">
            <div className="text-4xl mb-3">📅</div>

            <h3 className="text-gray-500">
              Site Visits
            </h3>

            <p className="text-4xl font-bold text-amber-500 mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="text-4xl mb-3">⚡</div>

            <h3 className="text-gray-500">
              Conversions
            </h3>

            <p className="text-4xl font-bold text-green-500 mt-2">
              0
            </p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">
            Recent Activity
          </h3>
<div className="space-y-4">

  {data.recentLeads.map((lead) => (
    <div
      key={lead._id}
      className="bg-green-50 border border-green-100 rounded-2xl p-4 hover:bg-green-100 transition"
    >
      <div className="flex justify-between items-center">

        <div>
          <h4 className="font-semibold text-gray-800">
            👤 {lead.name}
          </h4>

          <p className="text-gray-500 text-sm">
            📍 {lead.city || "Unknown City"}
          </p>
        </div>

        <div className="text-sm text-green-600 font-medium">
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
