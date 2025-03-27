import { connectDb } from '@/lib/config/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/UserModel';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDb();

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password exists and is valid
    if (!user.password) {
      return NextResponse.json(
        { error: "Password not set for this account" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return user data without password
    const userData = user.toObject();
    delete userData.password;

    return NextResponse.json(
      {
        success: true,
        token,
        user: userData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Signin error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}