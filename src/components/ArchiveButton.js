"use client";

export default function ArchiveButton({ leadId }) {
  async function archiveLead() {
    console.log("Lead ID:", leadId);

    const confirmArchive = confirm("Archive this lead?");

    if (!confirmArchive) return;

    try {
      const response = await fetch("/api/archive-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
        }),
      });

      console.log("Status:", response.status);

      const data = await response.json();

      console.log("Response:", data);

      if (data.success) {
        alert("Lead archived");
        window.location.reload();
      } else {
        alert("Failed to archive lead");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={archiveLead}
      className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm"
    >
      📦 Archive
    </button>
  );
}