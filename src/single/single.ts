import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import cloudFlareClients from "../../lib/cloudflare";
import prismaClients from "../../lib/prisma";
import { env } from "hono/adapter";
import image from "./image/image";
type Bindings = {
  DB: D1Database;
  KV_MY: KVNamespace;
};
const app = new Hono<{ Bindings: Bindings }>();

// app.post("/", async (c) => {
//   const { DB } = env<{ DB: D1Database }>(c)
//   const prisma = await prismaClients.fetch(DB)
//   try {
//       const single = await prisma.single.create({
//         data: {
//           name:

//         }
//       })
//   } catch (error) {
//     console.log("Error at post single")
//     throw new HTTPException(401, {message: "Error at add Single"})
//   }
// })
app.route("/image", image);
export default app;
