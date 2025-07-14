const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000 
//middlwire
app.use(cors());
app.use(express.json({limit:"50mb"}))

 const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

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
    const usercollection = client.db('MJSUSER').collection('User')
    
  app.get('/ledbulbs/:id',async(req,res)=>{
    const id= req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await bulbcollection.findOne(query)
    res.send(result)
  })
  app.get('/user/:id',async(req,res)=>{
    const id= req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await usercollection.findOne(query)
    res.send(result)
  })

 /**==========delate items========== */
    app.delete('/ledbulbs/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id:new ObjectId(id) }
            const result = await bulbcollection.deleteOne(query)
            res.send(result)
    })
    app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id:new ObjectId(id) }
            const result = await usercollection.deleteOne(query)
            res.send(result)
    })
  
    //Post or add new bulb
    app.post('/ledbulbs',async(req,res)=>{
         const newbulbs=req.body;
         res.send(newbulbs);
         const result = await bulbcollection.insertOne(newbulbs)
         res.send(result);
        })
    app.post('/user',async(req,res)=>{
         const newbulbs=req.body;
         res.send(newbulbs);
         const result = await usercollection.insertOne(newbulbs)
         res.send(result);
        })

    // post or add addmin
   
   
   //Get all bulb 
   app.get('/ledbulbs',async(req,res)=>{
    const cursor = bulbcollection.find();
    const result = await cursor.toArray();
    res.send(result)
  
   })     
   app.get('/user',async(req,res)=>{
    const cursor = usercollection.find();
    const result = await cursor.toArray();
    res.send(result)
  
   })     
  //update bulbs items
  app.put('/ledbulbs/:id',async(req,res)=>{
    const id=req.params.id;
    const filter ={_id : new ObjectId(id)};
    const options={Upsert:true};
    const updatebulbs = req.body;
    const bulbs={
      $set:{
         name:updatebulbs.name,
          price:updatebulbs.price,
          Watt:updatebulbs.Watt,
          Lumen:updatebulbs.Lumen,
          gurantee:updatebulbs.gurantee,
          details:updatebulbs.details,
          photo:updatebulbs.photo
    }
  }
  const  result = await bulbcollection.updateOne(filter,bulbs,options)
 res.send(result);
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

