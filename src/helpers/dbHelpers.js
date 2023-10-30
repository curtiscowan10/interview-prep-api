const mysql = require('mysql2');
const config = require('../../environment.js').default;

const dbConfig = {
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  multipleStatements: true,
};

const connection = mysql.createConnection(dbConfig);

async function executeQuery(query) {
  try {
    connection.connect();
    const result = connection.query(query);
    return result.recordset;
  } catch (error) {
    console.error('An error occurred while executing the query:', error);
    throw error;
  } finally {
    connection.end();
  }
}
module.exports = {
  executeQuery,
  dbConfig
};
