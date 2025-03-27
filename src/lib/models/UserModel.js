import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  image: String,
  password: String,
  accounts: [{
    provider: String,
    providerAccountId: String,
    type: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String
  }],
  sessions: [{
    sessionToken: String,
    expires: Date
  }],
  verificationTokens: [{
    identifier: String,
    token: String,
    expires: Date
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Middleware to update updatedAt
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);