"use client";

export default function RestoreButton({ leadId }) {
  async function restoreLead() {
    const confirmRestore = confirm(
      "Restore this lead?"
    );

    if (!confirmRestore) return;

    try {
      const response = await fetch(
        "/api/restore-lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            leadId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Lead restored");
        window.location.reload();
      } else {
        alert("Failed to restore lead");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <button
      onClick={restoreLead}
      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
    >
      ♻ Restore
    </button>
  );
}