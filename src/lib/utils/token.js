import { mongoClientPromise } from "../models/UserModel";
import { randomBytes } from "crypto";

export async function generateVerificationToken(email) {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 3600 * 1000); // 1 hour

  const client = await mongoClientPromise;
  await client.db().collection("verificationTokens").insertOne({
    token,
    email,
    expires
  });

  return token;
}

export async function validateToken(token) {
  const client = await mongoClientPromise;
  const db = client.db();

  const tokenDoc = await db.collection("verificationTokens").findOne({ token });
  if (!tokenDoc) return null;

  if (new Date() > tokenDoc.expires) {
    await db.collection("verificationTokens").deleteOne({ token });
    return null;
  }

  return tokenDoc.email;
}