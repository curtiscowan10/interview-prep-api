const { executeQuery } = require('../../helpers/dbHelpers');

async function getNotes() {
  const query = 'SELECT * FROM Notes';
  return await executeQuery(query);
}

async function getNoteById(id) {
  const query = `SELECT * FROM Notes WHERE note_id = ${id}`;
  const result = await executeQuery(query);
  return result[0];
}

module.exports = {
  getNotes,
  getNoteById,
};
