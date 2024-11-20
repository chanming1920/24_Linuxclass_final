const express = require('express');
const bodyParser = require('body-parser');
const connectRoutes = require('./routes/connect');

const app = express();
app.use(bodyParser.json());
app.use('/api', connectRoutes);

//const PORT = 5000;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
