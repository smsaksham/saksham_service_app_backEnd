// import mongoose, { Mongoose } from "mongoose";

// // const url = process.env.URL || "mongodb+srv://sakshammalviya12345:@saksham8120@service-app.oop9d.mongodb.net/?retryWrites=true&w=majority&appName=service-app"
// const url = "mongodb://127.0.0.1:27017/service_app"
// mongoose.connect(url)

// console.log("mongodb server is connected ");

import{ MongoClient, ServerApiVersion }  from 'mongodb';
const uri = process.env.URL || "mongodb+srv://sakshammalviya12345:ByRq14zV6ndzh0IG@service-app.oop9d.mongodb.net/service-app?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
