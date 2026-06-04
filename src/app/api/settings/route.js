import { connectDB } from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  await connectDB();

  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return Response.json(settings);
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        body,
        { new: true }
      );
    }

    return Response.json({
      success: true,
      settings,
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}