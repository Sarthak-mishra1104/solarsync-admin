import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();

    const { leadId } = await request.json();

    await Lead.findByIdAndUpdate(leadId, {
      visitCompleted: true,
      status: "Visit Completed",
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