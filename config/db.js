const { Pool } = require('pg');

const getConnection = () =>{
    const conn = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    });
    console.log("Database Connected");
    return conn;
}

module.exports = getConnection;