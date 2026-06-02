import { connectDB } from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const lead = await Lead.create({
      companyId: body.companyId,
      name: body.name,
      phone: body.phone,
      city: body.city,
      monthlyBill: body.monthlyBill,
      source: body.source,
      status: body.status || "New Lead",
    });

    return Response.json(
      {
        success: true,
        lead,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function GET() {
  return Response.json({
    success: true,
    message: "API is running",
  });
}