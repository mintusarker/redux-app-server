const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dl1tykd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const productsCollection = client.db('highTech').collection('products')
        // const addProductCollection = client.db('highTech').collection('product')


        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productsCollection.find(query).toArray();
            res.send(result)
        });


        app.post('/products', async (req, res) => {
            const addProduct = req.body;
            const result = await productsCollection.insertOne(addProduct);
            res.send(result);
        });

        app.get('/products', async (req, res) => {
          const query = {};
          const result = await addProductCollection.find(query).toArray();
          res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.log)





app.get('/', async (req, res) => {
    res.send('server running')
})


app.listen(port, () => console.log(`server running on ${port}`))