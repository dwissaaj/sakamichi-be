const fs = require('fs');
module.exports = ({env}) => ({
  defaultConnection: "default",
  connection: {
    client: 'postgres',
    connectionString: env('DATABASE_CONNECTION_STRING'),
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      schema: env('DATABASE_SCHEMA'),

    }
  }
})
