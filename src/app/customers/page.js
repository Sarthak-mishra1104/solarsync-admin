export const dynamic = "force-dynamic";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  UserCheck,
} from "lucide-react";

async function getCustomers() {
  await connectDB();

  const customers = await Customer.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(customers));
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  const completedProfiles = customers.filter(
    (c) => c.profileCompleted
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <MobileNav />

        {/* Header */}

        <div className="mb-8">
          <p className="text-green-600 font-semibold uppercase tracking-wider text-sm">
            SolarSync CRM
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
            Customers
          </h1>

          <p className="text-slate-500 mt-2">
            Manage registered customers and profile activity.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <Users size={30} />

              <span className="text-green-100">
                Total Customers
              </span>
            </div>

            <h2 className="text-5xl font-bold mt-4">
              {customers.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <UserCheck className="text-green-600" />

              <span className="font-medium text-slate-700">
                Completed Profiles
              </span>
            </div>

            <h2 className="text-5xl font-bold text-slate-800 mt-4">
              {completedProfiles}
            </h2>
          </div>

        </div>

        {/* Customers Table */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">
              Customer Directory
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>
                  <th className="text-left p-4 font-semibold">
                    Customer
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Contact
                  </th>

                  <th className="text-left p-4 font-semibold">
                    City
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Status
                  </th>

                  <th className="text-left p-4 font-semibold">
                    Registered
                  </th>
                </tr>

              </thead>

              <tbody>

                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">
                          {customer.name?.charAt(0)}
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800">
                            {customer.name}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Mail size={14} />
                            {customer.email}
                          </div>
                        </div>

                      </div>

                    </td>

                    <td className="p-4 text-slate-600">

                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {customer.phone || "-"}
                      </div>

                    </td>

                    <td className="p-4 text-slate-600">

                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {customer.city || "-"}
                      </div>

                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.profileCompleted
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {customer.profileCompleted
                          ? "Completed"
                          : "Pending"}
                      </span>

                    </td>

                    <td className="p-4 text-slate-600">
                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  );
}

