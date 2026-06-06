export const dynamic = "force-dynamic";
import MobileNav from "@/components/MobileNav";
import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Sidebar from "@/components/Sidebar";

import {
  Users,
  UserCheck,
  Archive,
  CalendarDays,
  CheckCircle2,
  Zap,
  ArrowUpRight,
} from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <MobileNav />

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

          <div>
            <p className="text-green-600 font-semibold uppercase tracking-wider text-sm">
              SolarSync CRM
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Monitor leads, site visits and conversions.
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">

            <button className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
              + Add Lead
            </button>

            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition">
              Schedule Visit
            </button>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <Users size={28} />
              <ArrowUpRight size={20} />
            </div>

            <p className="text-green-100 mt-4">
              Total Leads
            </p>

            <h2 className="text-4xl font-bold mt-1">
              {data.totalLeads}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <UserCheck size={28} />
              <ArrowUpRight size={20} />
            </div>

            <p className="text-blue-100 mt-4">
              Active Leads
            </p>

            <h2 className="text-4xl font-bold mt-1">
              {data.activeLeads}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <CalendarDays size={28} />
              <ArrowUpRight size={20} />
            </div>

            <p className="text-orange-100 mt-4">
              Site Visits
            </p>

            <h2 className="text-4xl font-bold mt-1">
              {data.siteVisits}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Archive className="text-slate-500" />
              <span className="font-medium">
                Archived Leads
              </span>
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-800">
              {data.archivedLeads}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-indigo-500" />
              <span className="font-medium">
                Completed Visits
              </span>
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-800">
              {data.completedVisits}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Zap className="text-emerald-500" />
              <span className="font-medium">
                Conversions
              </span>
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-800">
              {data.conversions}
            </h2>
          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">

          <h3 className="text-xl font-bold text-slate-800 mb-5">
            Recent Leads
          </h3>

          <div className="space-y-3">

            {data.recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="flex justify-between items-center border border-slate-100 rounded-2xl p-4 hover:bg-slate-50 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                    {lead.name?.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {lead.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {lead.city || "Unknown City"}
                    </p>
                  </div>

                </div>

                <div className="text-green-600 font-medium text-sm">
                  {lead.status}
                </div>

              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  );
}

