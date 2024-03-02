import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
    
const app = express();
app.use(bodyParser.json());
app.use((cors))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/collabhub', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));