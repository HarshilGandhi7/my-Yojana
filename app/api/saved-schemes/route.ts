import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }
    const email = authHeader.split(" ")[1];
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const data = await request.json();
    console.log(data);
    const  schemeId = data._id;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updatedSavedSchemes = user.savedSchemes || [];
    if (!updatedSavedSchemes.includes(schemeId)) {
      updatedSavedSchemes.push(schemeId);
    }
    await db
      .collection("users")
      .updateOne({ email }, { $set: { savedSchemes: updatedSavedSchemes } });
    return NextResponse.json(
      { message: "Scheme saved successfully", success: true, savedSchemes: updatedSavedSchemes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save scheme" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }
    const email = authHeader.split(" ")[1];
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    delete user.password;
    return NextResponse.json(
      { savedSchemes: user.savedSchemes || [] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch saved schemes" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }
    const email = authHeader.split(" ")[1];
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const data = await request.json();
    const  schemeId  = data._id;
    console.log(schemeId);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updatedSchemes = (user.savedSchemes).filter(
      (id: string) => id != schemeId
    );


    await db
      .collection("users")
      .updateOne({ email }, { $set: { savedSchemes: updatedSchemes } });
    return NextResponse.json(
      { message: "Scheme deleted successfully", success: true , savedSchemes: updatedSchemes},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete scheme" },
      { status: 500 }
    );
  }
}
