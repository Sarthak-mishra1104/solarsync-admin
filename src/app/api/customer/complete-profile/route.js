```javascript
import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":
        "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type",
    },
  });
}

export async function POST(request) {
  try {
    await connectDB();

    const {
      email,
      phone,
      city,
    } = await request.json();

    const customer =
      await Customer.findOneAndUpdate(
        { email },
        {
          phone,
          city,
          profileCompleted: true,
          lastActiveAt: new Date(),
        },
        { new: true }
      );

    return Response.json(
      {
        success: true,
        customer,
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
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
```
