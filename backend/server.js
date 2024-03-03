const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
const authRoutes = require('../backend/routes/authRoutes')
const projectRoutes = require('../backend/routes/projectRoutes')

app.use('/api/auth' , authRoutes)
app.use('/api/project' , projectRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
