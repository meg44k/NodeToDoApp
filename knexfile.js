// Update with your config settings.
require('dotenv').config();


module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: process.env.SQLKEY,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: process.env.SQLKEY,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: process.env.SQLKEY,
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};