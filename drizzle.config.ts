import { defineConfig } from "drizzle-kit";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { env } from "hono/adapter";


export default defineConfig({
  dialect: "sqlite",
  schema: "./schema/*",
  out: "./drizzle",
  driver : "d1-http",
  dbCredentials: {
    accountId: "91894ac6dd3102c990a84257eab2af5",
    databaseId: "001c3da1-e4c3-456c-8533-841bbf9e1584",
    token: "1f9lgiX_Kh4Crm1xIN7WFkMsmDsOWU2KGJnxSP7S",
  },
});
