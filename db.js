import { Sequelize } from 'sequelize';
import pg from 'pg';
import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.POSTGRES_PORT || 5432, // Defina a porta conforme necessário
  dialect: dbConfig.dialect,
  dialectModule: pg,
  dialectOptions: dbConfig.dialectOptions,
  define: {
    timestamps: false,
  },
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
