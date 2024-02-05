const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection URI
const mongodbUri = 'mongodb://localhost:27017/your_database'; // Replace 'your_database' with your actual database name

// Endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(mongodbUri, { useUnifiedTopology: true });
    await client.connect();

    // Access the 'users' collection
    const db = client.db();
    const usersCollection = db.collection('users');

    // Retrieve all users and convert to an array
    const users = await usersCollection.find().toArray();

    // Close the MongoDB connection
    client.close();

    // Send the JSON response with the list of users
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
