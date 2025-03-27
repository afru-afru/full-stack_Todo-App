import { mongoClientPromise } from "@/lib/model";
import { sendPasswordResetEmail } from "@/lib/utils/emails";

export async function POST(request) {
  const { email } = await request.json();
  const client = await mongoClientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return Response.json(
      { error: "No account with that email exists" },
      { status: 400 }
    );
  }

  await sendPasswordResetEmail(email);
  return Response.json({ success: true });
}