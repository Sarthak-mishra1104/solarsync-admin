import Sidebar from "@/components/Sidebar";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

async function getAnalytics() {
  await connectDB();

  const totalLeads = await Lead.countDocuments();

  const newLeads = await Lead.countDocuments({
    status: "New Lead",
  });

  const convertedLeads = await Lead.countDocuments({
    status: "Converted",
  });

  const topCities = await Lead.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  return {
    totalLeads,
    newLeads,
    convertedLeads,
    topCities,
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  const conversionRate =
    data.totalLeads > 0
      ? Math.round(
          (data.convertedLeads / data.totalLeads) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F8FFFA] flex">
      <Sidebar />

<main className="flex-1 p-4 md:p-8 overflow-x-hidden">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          📈 Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100">
            <p className="text-gray-500">Total Leads</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {data.totalLeads}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100">
            <p className="text-gray-500">New Leads</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {data.newLeads}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100">
            <p className="text-gray-500">Converted</p>
            <h2 className="text-4xl font-bold text-emerald-600 mt-2">
              {data.convertedLeads}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow border border-green-100">
            <p className="text-gray-500">Conversion Rate</p>
            <h2 className="text-4xl font-bold text-orange-500 mt-2">
              {conversionRate}%
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-green-100">

          <h2 className="text-2xl font-bold mb-6">
            🌍 Top Cities
          </h2>

          <div className="space-y-4">

            {data.topCities.map((city) => (
              <div
                key={city._id}
                className="flex justify-between items-center bg-green-50 p-4 rounded-2xl"
              >
                <span className="font-medium">
                  {city._id || "Unknown"}
                </span>

                <span className="bg-green-600 text-white px-3 py-1 rounded-full">
                  {city.count}
                </span>
              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  );
}