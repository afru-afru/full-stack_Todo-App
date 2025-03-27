import { connectDb } from '@/lib/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/UserModel';

export async function POST(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };


  try {

    const rawBody = await request.text();
    let body;

    try {
      body = JSON.parse(rawBody);
    } catch (parseError) {
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400, headers }
      );
    }


    // 2. Validate required fields
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missing: {
            email: !body.email,
            password: !body.password,
            name: !body.name
          }
        },
        { status: 400, headers }
      );
    }

    // 3. Connect to database
    await connectDb();

    // 4. Check for existing user
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409, headers }
      );
    }

    // 5. Create new user
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const newUser = await User.create({
      email: body.email,
      password: hashedPassword,
      name: body.name
    });

    // 6. Return success response
    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser._id.toString(),
          email: newUser.email
        }
      },
      { status: 201, headers }
    );

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}