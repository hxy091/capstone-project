import mongoose from 'mongoose';

let connectingPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectingPromise) {
    connectingPromise = mongoose.connect(process.env.MONGO_URI);
  }

  try {
    const conn = await connectingPromise;
    connectingPromise = null;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    connectingPromise = null;
    console.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
