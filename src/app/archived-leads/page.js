export const dynamic = "force-dynamic";
import RestoreButton from "@/components/RestoreButton";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Link from "next/link";

async function getArchivedLeads() {
  await connectDB();

  const leads = await Lead.find({
    isArchived: true,
  })
    .sort({ updatedAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(leads));
}

export default async function ArchivedLeadsPage() {
  const leads = await getArchivedLeads();

  return (
    <div className="min-h-screen bg-[#F8FFFA] p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            📦 Archived Leads
          </h1>

          <p className="text-gray-500 mt-2">
            Previously completed or hidden leads
          </p>
        </div>

        <Link
          href="/leads"
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          ← Active Leads
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table className="w-full">

          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b"
              >
                <td className="p-4">{lead.name}</td>
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">{lead.city}</td>
                <td className="p-4">{lead.status}</td>
                <td className="p-4">
  <RestoreButton leadId={lead._id} />
</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}