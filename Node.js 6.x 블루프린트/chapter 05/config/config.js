const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'chapter-05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter-05-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'chapter-05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter-05-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'chapter-05'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chapter-05-production'
  }
};

module.exports = config[env];
