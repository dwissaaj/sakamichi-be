module.exports = ({env}) => ({
  defaultConnection: "default",
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'db.telptiexcczzexiizuuu.supabase.co'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'postgres'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', '@Tsusui806cute'),
      schema: env('DATABASE_SCHEMA', 'public'),
    }
  }
})
