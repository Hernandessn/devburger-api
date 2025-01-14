require('dotenv').config(); // Importa o dotenv e carrega as variáveis do .env

module.exports = {
  dialect: process.env.PG_DIALECT, // Lê o dialeto do .env
  host: process.env.PG_HOST, // Corrige o prefixo para PG_
  port: process.env.PG_PORT, // Corrige o prefixo para PG_
  username: process.env.PG_USERNAME, // Corrige o prefixo para PG_
  password: process.env.PG_PASSWORD, // Corrige o prefixo para PG_
  database: process.env.PG_DATABASE, // Corrige o prefixo para PG_
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
