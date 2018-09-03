const NODE_ENV = process.env.NODE_ENV || 'production';
const configs = {
    development: {
        dialect: 'sqlite',
        storage: './db.development.sqlite'
    },
    test: {
        dialect: 'sqlite',
        storage: ':memory:'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: 'mysql',
    }
};

module.exports = configs[NODE_ENV];
