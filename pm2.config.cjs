module.exports = {
  apps: [
    {
      name: 'walmart-list',
      script: 'bun',
      args: 'run index.ts',
      cwd: '~/projects/walmart-list',
      interpreter: 'none', 
      env: {
        NODE_ENV: 'production',
        PORT: 3004,
      },
    },
  ],
};
