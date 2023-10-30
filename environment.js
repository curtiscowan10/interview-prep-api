require('dotenv').config();

module.exports.default = {
    port: parseInt(process.env.PORT),
    db: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
    }
};