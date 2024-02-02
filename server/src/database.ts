import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGO as string;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connection SUCCESS')
    } catch (error) {
        console.error('MongoDB connection FAIL')
        process.exit(1)
    }
}

export default connectDB;