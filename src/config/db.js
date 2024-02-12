import mongoose from "mongoose";

mongoose.set('strictQuery', true)
mongoose.set('debug', true)

const db = await mongoose.connect('mongodb+srv://martindconte:admin@cluster.9owkag6.mongodb.net/ecommerce',{
    serverSelectionTimeoutMS: 5000
})

mongoose.connection.on('connected', () => console.log('Mongoose connected to MongoDB'))

mongoose.connection.on('error', (error) => console.error('Mongoose connection error:', error))

export default db