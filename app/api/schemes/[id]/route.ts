import clientPromise from "@/lib/mongodb";

export async function GET(params: {
  url: string;
  searchParams?: URLSearchParams;
}) {
  try {
    const id = params.url.split("/").pop();
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB;
    const db = client.db(dbName);
    const scheme = await db
      .collection("schemes")
      .findOne({ _id: id as String });

    if (!scheme) {
      return new Response("Scheme not found", { status: 404 });
    }
    return new Response(JSON.stringify(scheme), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch scheme",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
