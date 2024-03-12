import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster";
// const MONGO_URI_DB = "mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce"

mongoose.set('strictQuery', true)
mongoose.set('debug', true) 

mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Mongoose connected to MongoDB'))
  .catch((error) => {
    console.error('Mongoose connection error:', error);
    process.exit(1);
  });

export {
    MONGO_URI
}

// import mongoose from "mongoose";

// mongoose.set('strictQuery', true)
// mongoose.set('debug', true)

// const db = await mongoose.connect('mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce',{
//     serverSelectionTimeoutMS: 5000
// })

// mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'))

// mongoose.connection.on('error', (error) => {
//     console.error('Mongoose connection error:', error)
//     process.exit(1)
// })

// export default db
// export {
//     MONGO_URI_SESSION
// }