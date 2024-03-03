
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://aryan:aryan123@cluster0.nzq8uvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'CollabHub'; // Replace 'your-database-name' with your actual database name

const client = new MongoClient(uri);

async function connectDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = { connectDatabase };

