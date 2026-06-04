"use client";

import { useState } from "react";

export default function ScheduleVisitButton({ leadId }) {
  const [showForm, setShowForm] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [engineer, setEngineer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!visitDate) {
      alert("Please select a visit date");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/schedule-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          siteVisitDate: visitDate,
          assignedTo: engineer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Site Visit Scheduled Successfully");
        setShowForm(false);
        window.location.reload();
      } else {
        alert("Failed to schedule visit");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
      >
        📅 Schedule Visit
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-3xl shadow-xl w-[400px]">

            <h2 className="text-2xl font-bold mb-4">
              Schedule Site Visit
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Visit Date
                </label>

                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) =>
                    setVisitDate(e.target.value)
                  }
                  className="w-full border border-green-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Engineer Name
                </label>

                <input
                  type="text"
                  value={engineer}
                  onChange={(e) =>
                    setEngineer(e.target.value)
                  }
                  placeholder="Enter engineer name"
                  className="w-full border border-green-200 rounded-xl px-3 py-2"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
              >
                {loading ? "Saving..." : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}