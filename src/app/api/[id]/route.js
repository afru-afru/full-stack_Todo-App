// app/api/route.js
import { connectDb } from "@/lib/config/db";
import TodoModel from "@/lib/models/ToDoModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

await connectDb();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    let query = {};
    if (q) {
      // Check if search term looks like a MongoDB ID
      const isPossibleId = mongoose.isValidObjectId(q);

      query = {
        $or: [
          ...(isPossibleId ? [{ _id: new mongoose.Types.ObjectId(q) }] : []),
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const todos = await TodoModel.find(query);
    return NextResponse.json({ todos });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}