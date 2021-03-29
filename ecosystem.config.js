module.exports = {
  apps : [{
    name: 'Titan Explorer',
    script: 'bin/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
        user: 'ubuntu',
        key: `${process.env.HOME}/Documents/ssh/TideWallet3.pem`,
        host: '13.124.220.202',
        ref: 'origin/main',
        repo: 'https://github.com/BOLT-Protocol/TitanExplorer',
        path: '/home/ubuntu/workspace/TitanExplorer',
        'post-deploy': 'pm2 reload /home/ubuntu/workspace/TitanExplorer/source/ecosystem.config.js',
    }
}
};
