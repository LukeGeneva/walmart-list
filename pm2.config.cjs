module.exports = {
  name: 'walmart-list',
  script: 'index.ts',
  cwd: process.env.WALMART_LIST_PATH,
  interpreter: 'bun',
  env: {
    NODE_ENV: 'production',
    WALMART_LIST_PATH: process.env.WALMART_LIST_PATH,
    WALMART_LIST_PORT: process.env.WALMART_LIST_PORT,
    WALMART_LIST_DB_PATH: process.env.WALMART_LIST_DB_PATH
  },
};

