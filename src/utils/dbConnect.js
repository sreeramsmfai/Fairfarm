import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;
console.log("MONGODB_URI:", URI);
if (!URI) {
  throw new Error('❌ MONGODB_URI is not defined in environment variables');
}
console.log("🚀 Mongo URI:", URI);
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
        cached.promise = mongoose.connect(URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
