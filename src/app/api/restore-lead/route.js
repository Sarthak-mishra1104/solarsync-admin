import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(request) {
  try {
    await connectDB();

    const { leadId } = await request.json();

    console.log("RESTORE ID:", leadId);

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      {
        isArchived: false,
      },
      { new: true }
    );

    console.log("UPDATED LEAD:", updatedLead);

    return Response.json({
      success: true,
      updatedLead,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}