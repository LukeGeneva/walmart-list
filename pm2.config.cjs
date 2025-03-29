module.exports = {
  apps: [
    {
      name: 'walmart-list',
      script: 'bun',
      args: 'run index.ts',
      cwd: './walmart-list',
      interpreter: 'none', // Tell PM2 not to use Node.js
      env: {
        NODE_ENV: 'production',
        PORT: 3004,
      },
    },
  ],
};
