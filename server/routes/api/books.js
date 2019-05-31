const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get books
router.get('/', async (req, res) => {
  const books = await loadBooksCollection();
  res.send(await books.find({}).toArray());
});

// Add Book
router.post('/', async (req, res) => {
  const books = await loadBooksCollection();
  await books.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
})

// Delete Book
router.delete('/:id', async (req, res) => {
  const books = await loadBooksCollection();
  await books.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
  res.status(200).send();
})

async function loadBooksCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://carlton123:pa$$w0rd123@bookshelfappcluster-ouugk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  return client.db('bookshelfappcluster').collection('books');
}

module.exports = router;
