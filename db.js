import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

pool.on('connect', () => {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

pool.on('error', (err) => {
  console.error('Erro na conexão com o banco de dados:', err);
});

module.exports = pool;
