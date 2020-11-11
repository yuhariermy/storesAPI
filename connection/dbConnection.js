const mysql = require('mysql')

const db = mysql.createConnection({
  database: 'stores',
  user: 'root',
  password: 'root',
  host: 'localhost',
})

db.query('SELECT "Database connected!" message', (err, result) => {
  if (err)
    console.log(err);
  else
    console.log(result[0].message);
})

module.exports = db