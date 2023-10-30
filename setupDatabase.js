const mysql = require('mysql2');
const fs = require('fs');
const { exit } = require('process');
const dbConfig = require('./src/helpers/dbHelpers.js').dbConfig;

const connection = mysql.createConnection(dbConfig);

async function runDeltaFiles() {
  try {
    connection.connect();

    const deltaFiles = fs.readdirSync('./src/deltas').sort();
    for (const deltaFile of deltaFiles) {
      let deltaContent = fs.readFileSync(`./src/deltas/${deltaFile}`, 'utf8');
      connection.query(deltaContent);
      console.log(`Executed delta file: ${deltaFile}`);
    }
    console.log('Database setup complete.');
  } catch (error) {
    console.error('An error occurred while setting up the database:', error);
  } finally {
    connection.end();
  }
}

runDeltaFiles();
