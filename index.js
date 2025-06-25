const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express();
const port =process.env.PORT || 5000;
 const { MongoClient, ServerApiVersion } = require('mongodb');
//middlwire
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Mjs Company Server is running')

})

/**============mongodb start============== */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@user-management-system.h2w7at6.mongodb.net/?retryWrites=true&w=majority&appName=user-management-system`;
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
    const bulbcollection = client.db('MjsDB').collection('Product')
    


    //Post or add new bulb
    app.post('/led-bulbs',async(req,res)=>{
         const newbulbs=req.body;
         res.send(newbulbs);
         const result = await bulbcollection.insertOne(newbulbs)
         res.send(result);
        })

   //Get all bulb 
   app.get('/led-bulbs',async(req,res)=>{
    const cursor = bulbcollection.find();
    const result = await cursor.toArray();
    res.send(result)
    res.send('All Data')
   })     

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
/**===============mongodb end=========== */
app.listen(port,()=> {
    console.log('This MJS Company Server Running By Port',port)
})

