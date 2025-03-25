import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://afrah:1%28fru%2Bbud%29@cluster0.uxg4u.mongodb.net/todo_project?retryWrites=true&w=majority'
    );
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB connection failed:', error);
    process.exit(1); // Exit process with failure
  }
};