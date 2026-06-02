import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();

    const lead = await Lead.create({
      name: "Sarthak Test",
      phone: "9999999999",
      city: "Kanpur",
      monthlyBill: 5000,
      roofSize: 1200,
      source: "Test API",
    });

    return Response.json({
      success: true,
      lead,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}