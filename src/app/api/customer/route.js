import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        "https://vikram-solar-fnex.vercel.app",
      "Access-Control-Allow-Methods":
        "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const {
      name,
      email,
      photoURL,
    } = await request.json();

    let customer = await Customer.findOne({
      email,
    });

    if (!customer) {
      customer = await Customer.create({
        name,
        email,
        photoURL,
      });
    } else {
      customer.lastActiveAt = new Date();
      await customer.save();
    }

    return Response.json(
      {
        success: true,
        customer,
      },
      {
        headers: {
          "Access-Control-Allow-Origin":
            "https://vikram-solar-fnex.vercel.app",
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
        headers: {
          "Access-Control-Allow-Origin":
            "https://vikram-solar-fnex.vercel.app",
        },
      }
    );
  }
}