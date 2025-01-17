import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { env } from "hono/adapter";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const { KV_MY } = env<{ KV_MY: KVNamespace }>(c)
    let value = await KV_MY.get("test")
    console.log(value)
    return c.text("Success");
  } catch (e) {
    throw new HTTPException(401, { message: "something wrong" });
  }
});

export default app;
