export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(
      request.url
    );

    const email =
      searchParams.get("email");

    // Single customer
    if (email) {
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
    }

    // All customers
    const customers =
      await Customer.find({})
        .sort({
          createdAt: -1,
        })
        .lean();

    return Response.json(
      {
        success: true,
        customers,
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

