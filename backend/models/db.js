const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ariana',
    database: 'reservas',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})


module.exports = pool.promise();