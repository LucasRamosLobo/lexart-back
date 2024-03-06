// src/db.js
const { Sequelize } = require('sequelize');
const config = require('./config/config');
import * as pg from 'pg';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, {
  dialectModule: pg,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  host: "ep-white-butterfly-a435d8j5-pooler.us-east-1.aws.neon.tech",
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
