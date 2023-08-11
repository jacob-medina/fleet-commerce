require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

async function start() { 
    const dbInit = `DROP DATABASE IF EXISTS ${process.env.DB_NAME};\nCREATE DATABASE ${process.env.DB_NAME};\nUSE ${process.env.DB_NAME};\n`;
    
    db.connect(err => {
        if (err) throw err;

        db.query(dbInit, (err) => {
            if (err) throw err;
            console.info(`\x1b[32m ${process.env.DB_NAME} initialized.`);
            db.end();
        });
    });


}

start();