import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from '@/lib/config/db';
import User from '@/lib/models/UserModel';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectDb();

        // Handle signup when isSignup flag is present
        if (req.body?.isSignup) {
          const existingUser = await User.findOne({ email: credentials.email });
          if (existingUser) {
            throw new Error("Email already exists");
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          const newUser = await User.create({
            email: credentials.email,
            password: hashedPassword,
            name: req.body.name
          });

          return {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name
          };
        }

        // Regular login logic
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("Invalid credentials");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);