// src/app/api/route.js
import { connectDb } from "@/lib/config/db";
import TodoModel from "@/lib/models/ToDoModel";
import { NextResponse } from "next/server";

// Connect to database
await connectDb();

export async function GET(request) {
    const todos=await TodoModel.find({})
  return NextResponse.json({ todos:todos })
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();

    // Create new todo
    const newTodo = await TodoModel.create({
      title,
      description
    });

    return NextResponse.json({
      Msg: "Todo created successfully",
      todo: newTodo
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request){
    const mongoId=await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({
        Msg: "Todo Deleted",

      });
}

export async function PUT(request){
    const mongoId=await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true
        }
    })
    return NextResponse.json({
        Msg: "Todo updetedd",

      });
}



