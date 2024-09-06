const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3500;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// mongodb configuration
const uri =
  'mongodb+srv://rumah-baca:PsVgCt2bTdFIjO7N@cluster0.ioumh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect to MongoDB once and keep the connection alive
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // exit if unable to connect
  }
}

// run the MongoDB connection function
connectToMongoDB();

// create a collection of documents
const bookCollections = client.db('BookInventory').collection('books');

// insert a book to the db: post method
app.post('/upload-book', async (req, res) => {
  try {
    const data = req.body;
    const result = await bookCollections.insertOne(data);
    res.send(result);
  } catch (error) {
    console.error('Error uploading book:', error);
    res.status(500).send('Failed to upload book');
  }
});

// get a book data
app.get('/book/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookCollections.findOne({ _id: new ObjectId(id) });
    res.json(book);
  } catch (error) {
    console.error('Error fetching book data:', error);
    res.status(500).send('Failed to fetch book data');
  }
});

// update a book data: patch or update method
app.patch('/book/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateBookData = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        ...updateBookData,
      },
    };

    // update
    const result = await bookCollections.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    console.error('Error update a book data:', error);
    res.status(500).send('Failed to update a book data');
  }
});

// delete a book data
app.delete('/book/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollections.deleteOne(filter);
    res.send(result);
  } catch (error) {
    console.error('Error delete a book data:', error);
    res.status(500).send('Failed to detele a book data');
  }
});

// find by category
app.get('/all-books', async (req, res) => {
  try {
    let query = {};
    if (req.query?.category) {
      query = { category: req.query.category };
    }
    const result = await bookCollections.find(query).toArray();
    res.send(result);
  } catch (error) {
    console.error('Error get all books by category:', error);
    res.status(500).send('Failed to get all books by category');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
