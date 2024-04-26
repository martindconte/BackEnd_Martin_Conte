import mongoose from "mongoose";

mongoose.set('strictQuery', true)
mongoose.set('debug', true)

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL)
    const url = `${connection.host}:${connection.port}`
    console.log(`MongoDB in ${url}`)
  } catch (error) {
    console.log('Error connecting to MongoDB')
    process.exit(1)
  }
}