import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Link from "next/link";

async function getLead(id) {
  await connectDB();

  const lead = await Lead.findById(id).lean();

  return JSON.parse(JSON.stringify(lead));
}

export default async function LeadDetailsPage({ params }) {
  const { id } = await params;

  const lead = await getLead(id);

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">
          Lead Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Lead Details
        </h1>

        <Link
          href="/leads"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          ← Back to Leads
        </Link>
      </div>

      {/* Hero Card */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 text-white shadow-xl mb-8">

        <div className="flex flex-col lg:flex-row justify-between">

          <div>
            <h2 className="text-4xl font-bold mb-3">
              {lead.name}
            </h2>

            <p className="text-green-100 text-lg">
              📞 {lead.phone}
            </p>

            <p className="text-green-100 text-lg mt-2">
              🏙 {lead.city || "Not Available"}
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <span className="bg-white/20 backdrop-blur px-5 py-3 rounded-full text-lg font-semibold">
              🟢 {lead.status}
            </span>
          </div>

        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <button className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 text-left">
          <div className="text-3xl mb-2">📅</div>
          <h3 className="font-bold text-slate-800">
            Schedule Visit
          </h3>
        </button>

        <button className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 text-left">
          <div className="text-3xl mb-2">📄</div>
          <h3 className="font-bold text-slate-800">
            Create Proposal
          </h3>
        </button>

        <button className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 text-left">
          <div className="text-3xl mb-2">📞</div>
          <h3 className="font-bold text-slate-800">
            Contact Customer
          </h3>
        </button>

      </div>

      {/* Info Cards */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Customer Info */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Customer Information
          </h3>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500">Customer Name</p>
              <h4 className="text-xl font-semibold">
                {lead.name}
              </h4>
            </div>

            <div>
              <p className="text-gray-500">Phone Number</p>
              <h4 className="text-xl font-semibold">
                {lead.phone}
              </h4>
            </div>

            <div>
              <p className="text-gray-500">City</p>
              <h4 className="text-xl font-semibold">
                {lead.city || "Not Available"}
              </h4>
            </div>

          </div>

        </div>

        {/* Solar Assessment */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h3 className="text-2xl font-bold text-slate-800 mb-6">
            Solar Assessment
          </h3>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500">Monthly Bill</p>
              <h4 className="text-xl font-semibold text-green-600">
                ₹ {lead.monthlyBill || 0}
              </h4>
            </div>

            <div>
              <p className="text-gray-500">Roof Size</p>
              <h4 className="text-xl font-semibold">
                {lead.roofSize || 0} sq ft
              </h4>
            </div>

            <div>
              <p className="text-gray-500">Lead Source</p>
              <h4 className="text-xl font-semibold">
                {lead.source}
              </h4>
            </div>

          </div>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-8">

        <h3 className="text-2xl font-bold text-slate-800 mb-6">
          Activity Timeline
        </h3>

        <div className="space-y-4">

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <p>Lead Created</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <p>Status Updated: {lead.status}</p>
          </div>

        </div>

      </div>

    </div>
  );
}