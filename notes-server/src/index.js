const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const notesRouter = require('./notesRouter');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'notesuser',
  password : 'password',
  database : 'notesDB'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(notesRouter(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
