"use client";

export default function CompleteVisitButton({ leadId }) {
  async function completeVisit() {
    const ok = confirm(
      "Mark site visit as completed?"
    );

    if (!ok) return;

    try {
      const response = await fetch(
        "/api/complete-visit",
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
        alert("Visit completed");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={completeVisit}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
    >
      ✅ Complete Visit
    </button>
  );
}