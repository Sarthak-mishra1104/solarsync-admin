import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();

    const { leadId, siteVisitDate, assignedTo } =
      await request.json();

    await Lead.findByIdAndUpdate(leadId, {
      siteVisitDate,
      assignedTo,
      status: "Site Visit Scheduled",
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}