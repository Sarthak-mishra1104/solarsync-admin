"use client";

import { useState } from "react";

export default function StatusDropdown({ leadId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value;

    setStatus(newStatus);
    setLoading(true);

    try {
      const response = await fetch("/api/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error updating status");
    }

    setLoading(false);
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
    className="border border-green-200 rounded-xl px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400" 
    >
      <option value="New Lead">New Lead</option>
      <option value="Contacted">Contacted</option>
      <option value="Site Visit Scheduled">
        Site Visit Scheduled
      </option>
      <option value="Proposal Sent">Proposal Sent</option>
      <option value="Converted">Converted</option>
      <option value="Closed">Closed</option>
    </select>
  );
}