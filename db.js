// src/db.js
const { Sequelize } = require('sequelize');
const config = require('./config/config');


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(process.env.POSTGRES_URL, {

  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;
