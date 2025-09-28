import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const state = searchParams.get("state");
    const tag = searchParams.get("tag");
    const limit = Number(searchParams.get("limit") || "10");
    const skip = Number(searchParams.get("skip") || "0");

    if (!level || !state || !tag) {
      return NextResponse.json(
        { error: "Please select all the filter fields" },
        { status: 422 }
      );
    }
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB;
    const db = client.db(dbName);
    const query: any = {};

    if (level == "State" && state != "All") {
      query.state = { $regex: state, $options: "i" };
    }

    if (level != "All") {
      query.level = { $regex: level, $options: "i" };
    }
    query.tags = { $in: [tag] };
    const totalCount = await db.collection("schemes").countDocuments(query);

    const schemes = await db
      .collection("schemes")
      .find(query)
      .limit(limit)
      .skip(skip)
      .toArray();

    return NextResponse.json({
      schemes: schemes,
      pagination: {
        total: totalCount,
        currentPage: Math.floor(skip / limit) + 1,
        totalPages: Math.ceil(totalCount / limit),
        limit,
        skip,
        hasMore: skip + schemes.length < totalCount,
      },
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch schemes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB;
  const db = client.db(dbName);

  const body = await req.json();
  const result = await db.collection("schemes").insertMany(body.schemes);

  return NextResponse.json({ inserted: result.insertedCount });
}
