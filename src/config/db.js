import mongoose from "mongoose";

// const MONGO_URI = "mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster";
// const MONGO_URI_DB = "mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce"

// console.log(process.env.MONGO_URI)

mongoose.set('strictQuery', true)
mongoose.set('debug', true)

// mongoose.connect(MONGO_URI, {
//   serverSelectionTimeoutMS: 5000,
// })
//   .then(() => console.log('Mongoose connected to MongoDB'))
//   .catch((error) => {
//     console.error('Mongoose connection error:', error);
//     process.exit(1);
//   });

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


// export {
//   MONGO_URI
// }