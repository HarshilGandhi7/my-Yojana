import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {params}: { params: { id: string } }
) {
  const { id } = params;
  try {
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
