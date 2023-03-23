import mongoose from "mongoose";

const connectDb = async () => {
    const res = await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connection established');
    return res;
}

export default connectDb;