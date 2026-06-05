import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(request) {
  try {
    await connectDB();

    const { email, phone } =
      await request.json();

    const customer =
      await Customer.findOneAndUpdate(
        { email },
        {
          phone,
          profileCompleted: true,
          lastActiveAt: new Date(),
        },
        { new: true }
      );

    return Response.json({
      success: true,
      customer,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}