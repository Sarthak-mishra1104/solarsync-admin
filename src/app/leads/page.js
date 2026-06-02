import StatusDropdown from "@/components/StatusDropdown";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Link from "next/link";

async function getLeads() {
  await connectDB();

  const leads = await Lead.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(leads));
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            👥 Lead Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer inquiries from SolarSync
          </p>
        </div>

        <Link
          href="/dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold">
          Total Leads: {leads.length}
        </h2>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Phone</th>
                <th className="text-left p-4">City</th>
                <th className="text-left p-4">Source</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="p-4 font-medium">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    {lead.city}
                  </td>

                  <td className="p-4">
                    {lead.source}
                  </td>

                  <td className="p-4">
                   <StatusDropdown
  leadId={lead._id}
  currentStatus={lead.status}
/>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}