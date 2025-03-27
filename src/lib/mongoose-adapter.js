import { connectDb } from '@/lib/config/db';
import User from '../lib/models/UserModel';

export async function MongooseAdapter() {
  await connectDb();

  return {
    async createUser(user) {
      return User.create(user);
    },
    async getUser(id) {
      return User.findById(id);
    },
    async getUserByEmail(email) {
      return User.findOne({ email });
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const user = await User.findOne({
        'accounts.provider': provider,
        'accounts.providerAccountId': providerAccountId,
      });
      return user || null;
    },
    async updateUser(user) {
      return User.findByIdAndUpdate(user.id, user, { new: true });
    },
    async deleteUser(userId) {
      return User.findByIdAndDelete(userId);
    },
    async linkAccount(account) {
      return User.findByIdAndUpdate(
        account.userId,
        { $push: { accounts: account } },
        { new: true }
      );
    },
    async unlinkAccount({ provider, providerAccountId }) {
      return User.findOneAndUpdate(
        { 'accounts.provider': provider, 'accounts.providerAccountId': providerAccountId },
        { $pull: { accounts: { provider, providerAccountId } } },
        { new: true }
      );
    },
    async createSession({ sessionToken, userId, expires }) {
      return User.findByIdAndUpdate(
        userId,
        { $push: { sessions: { sessionToken, expires } } },
        { new: true }
      );
    },
    async getSessionAndUser(sessionToken) {
      const user = await User.findOne({
        'sessions.sessionToken': sessionToken,
      });
      if (!user) return null;

      const session = user.sessions.find(s => s.sessionToken === sessionToken);
      return { user, session };
    },
    async updateSession({ sessionToken, expires }) {
      return User.findOneAndUpdate(
        { 'sessions.sessionToken': sessionToken },
        { $set: { 'sessions.$.expires': expires } },
        { new: true }
      );
    },
    async deleteSession(sessionToken) {
      return User.findOneAndUpdate(
        { 'sessions.sessionToken': sessionToken },
        { $pull: { sessions: { sessionToken } } },
        { new: true }
      );
    },
    async createVerificationToken(token) {
      return User.findOneAndUpdate(
        { email: token.identifier },
        { $push: { verificationTokens: token } },
        { new: true, upsert: true }
      );
    },
    async useVerificationToken({ identifier, token }) {
      const user = await User.findOne({
        email: identifier,
        'verificationTokens.token': token,
      });
      if (!user) return null;

      await User.findOneAndUpdate(
        { email: identifier },
        { $pull: { verificationTokens: { token } } }
      );
      return user.verificationTokens.find(t => t.token === token);
    },
  };
}