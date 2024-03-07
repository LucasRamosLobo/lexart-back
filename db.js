import { Sequelize } from 'sequelize';
import pg from 'pg';
import config from './config/config';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: dbConfig.dialect,
  dialectModule: pg, // Indica que estamos utilizando o pacote pg para a conexão
  dialectOptions: dbConfig.dialectOptions,
  host: process.env.POSTGRES_HOST,
  define: {
    timestamps: false, // Desativar a criação automática de campos de timestamp
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
