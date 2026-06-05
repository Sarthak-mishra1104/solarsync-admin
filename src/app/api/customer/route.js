
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":
        "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(
      request.url
    );

    const email =
      searchParams.get("email");

    const customer =
      await Customer.findOne({
        email,
      });

    return Response.json(
      {
        success: true,
        customer,
      },
      {
        headers: {
          "Access-Control-Allow-Origin":
            "*",
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
            "*",
        },
      }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const data =
      await request.json();

    const {
      name,
      email,
      photoURL,
      phone,
      city,
      profileCompleted,
    } = data;

    let customer =
      await Customer.findOne({
        email,
      });

    if (!customer) {
      customer =
        await Customer.create({
          name,
          email,
          photoURL,
          phone: phone || "",
          city: city || "",
          profileCompleted:
            profileCompleted ||
            false,
        });
    } else {
      if (phone)
        customer.phone = phone;

      if (city)
        customer.city = city;

      if (
        profileCompleted !==
        undefined
      ) {
        customer.profileCompleted =
          profileCompleted;
      }

      customer.lastActiveAt =
        new Date();

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
            "*",
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
            "*",
        },
      }
    );
  }
}

