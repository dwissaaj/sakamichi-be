import { defineConfig } from "drizzle-kit";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { env } from "hono/adapter";

const db = drizzle()
export default defineConfig({
  dialect: "sqlite",
  schema: ["./schema/*"],
  out: "./drizzle",
  
});
