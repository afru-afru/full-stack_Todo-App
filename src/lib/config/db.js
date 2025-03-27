import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://afrah:1%28fru%2Bbud%29@cluster0.uxg4u.mongodb.net/todo_project?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }).then(mongoose => {
      console.log('MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};