const express = require('express');

const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();

require('./configuration/middlewares')(app, express);
require('./configuration/routes')(app);
require('./configuration/post-routes')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
