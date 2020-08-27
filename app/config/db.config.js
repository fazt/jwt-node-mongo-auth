module.exports = {
  HOST: process.env.MONGODB_HOST || 'localhost',
  PORT: 27017,
  DB: process.env.MONGODB_DB ||'authdb'
}