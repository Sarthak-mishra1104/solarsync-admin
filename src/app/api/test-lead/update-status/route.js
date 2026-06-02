import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();

    const { leadId, status } = await request.json();

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { status },
      { new: true }
    );

    return Response.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}