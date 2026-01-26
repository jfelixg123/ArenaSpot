const express = require('express');
const router = require('./router/users');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api/users', router);

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});