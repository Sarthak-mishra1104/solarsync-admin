import CompleteVisitButton from "@/components/CompleteVisitButton";
import Sidebar from "@/components/Sidebar";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

async function getSiteVisits() {
  await connectDB();

  const visits = await Lead.find({
    siteVisitDate: {
      $exists: true,
      $ne: null,
    },
  })
    .sort({ siteVisitDate: 1 })
    .lean();

  return JSON.parse(JSON.stringify(visits));
}

export default async function SiteVisitsPage() {
  const visits = await getSiteVisits();

  return (
    <div className="min-h-screen bg-[#F8FFFA] flex">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          📅 Site Visits
        </h1>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-green-100">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
              <tr>
                <th className="text-left p-5">Customer</th>
                <th className="text-left p-5">Phone</th>
                <th className="text-left p-5">City</th>
                <th className="text-left p-5">Visit Date</th>
                <th className="text-left p-5">Engineer</th>
                <th className="text-left p-5">Status</th>
<th className="text-left p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {visits.map((visit) => (
                <tr
                  key={visit._id}
                  className="border-b hover:bg-green-50"
                >
                  <td className="p-5">{visit.name}</td>

                  <td className="p-5">{visit.phone}</td>

                  <td className="p-5">{visit.city}</td>

                  <td className="p-5">
                    {visit.siteVisitDate
                      ? new Date(
                          visit.siteVisitDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                 <td className="p-5">
  {visit.assignedTo || "-"}
</td>

<td className="p-5">
  {visit.visitCompleted ? (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Completed
    </span>
  ) : (
    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      Pending
    </span>
  )}
</td>

<td className="p-5">
  {!visit.visitCompleted ? (
    <CompleteVisitButton
      leadId={visit._id}
    />
  ) : (
    <span className="text-green-600 font-medium">
      ✅ Done
    </span>
  )}
</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </main>
    </div>
  );
}