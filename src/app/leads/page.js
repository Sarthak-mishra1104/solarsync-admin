import ScheduleVisitButton from "@/components/ScheduleVisitButton";
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
    <div className="min-h-screen bg-[#F8FFFA] p-8">

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
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition shadow-md"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-green-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
            👥
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total Leads
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {leads.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-green-100">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
              <tr>
                <th className="text-left p-5 font-semibold">
                  Name
                </th>

                <th className="text-left p-5 font-semibold">
                  Phone
                </th>

                <th className="text-left p-5 font-semibold">
                  City
                </th>

                <th className="text-left p-5 font-semibold">
                  Source
                </th>

                <th className="text-left p-5 font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b border-green-50 hover:bg-green-50 transition"
                >
                  <td className="p-5 font-medium text-gray-800">
                    {lead.name}
                  </td>

                  <td className="p-5 text-gray-700">
                    {lead.phone}
                  </td>

                  <td className="p-5 text-gray-700">
                    {lead.city || "—"}
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      {lead.source}
                    </span>
                  </td>

                  <td className="p-4">
  <div className="flex flex-col gap-2">
    
    <StatusDropdown
      leadId={lead._id}
      currentStatus={lead.status}
    />

    <ScheduleVisitButton
      leadId={lead._id}
    />

  </div>
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