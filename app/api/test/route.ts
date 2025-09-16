import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const dbName = process.env.MONGODB_DB;
    const client = await clientPromise;
    const db = client.db(dbName);

    await db.admin().ping();
      
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({ 
      success: true,
      message: "Database connected successfully!",
      database: dbName,
      collections: collections.map(col => col.name)
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}