const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

async function start() {
    const answer = await inquirer.prompt([
        {
            name: 'dbName',
            type: 'input',
            message: 'Enter database name:'
        },
        {
            name: 'dbUser',
            type: 'input',
            message: 'Enter database user (usually root):'
        },
        {
            name: 'dbPassword',
            type: 'password',
            message: 'Enter MySQL password:'
        }
    ])
    
    const data = `DB_NAME=${answer.dbName}\nDB_USER=${answer.dbUser}\nDB_PASSWORD="${answer.dbPassword}"`;
    const err = await fs.promises.writeFile(path.join(__dirname, '.env'), data);
    
    if (err) throw err;
    
    console.info('\x1b[32m .env file created successfully!');
}

start();
