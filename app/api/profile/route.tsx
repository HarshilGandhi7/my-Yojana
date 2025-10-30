"use server";
import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
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
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const { email, ...profileFields } = data;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updateData: Record<string, any> = {};
    Object.entries(profileFields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== "_id") {
        updateData[key] = value;
      }
    });
    updateData["updatedAt"] = new Date();
    await db.collection("users").updateOne({ email }, { $set: updateData });
    return NextResponse.json(
      { message: "Profile updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
};
