import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { requestId } from "hono/request-id";
type Bindings = {
  DB: D1Database;
  KV_MY: KVNamespace;
};

const image = new Hono<{ Bindings: Bindings }>();
image.use("*", requestId({ limitLength: 25 }));
image.get("/:key", async (c) => {
  const key = c.req.param("key");
  const path = c.req.path;
  const method = c.req.method;
  try {
    const image = await c.env.KV_MY.get(key, { type: "arrayBuffer" });
    if (!image) {
      console.error(`Error:S102 at ${method} ${path}`);
      throw new HTTPException(400, {
        message: "No Image is found with this ID",
        cause: `There is data with same ID`,
      });
    }
    c.status(200);
    c.header("Content-Type", "image/jpeg");
    c.header("Conten-Type", "image/png");
    return c.body(image);
  } catch (error) {
    console.error(`Error:S101 at ${method} ${path}`);
    throw new HTTPException(401, { message: "something wrong" });
  }
});
image.put("/upload", async (c: Context) => {
  const uuid = c.get("requestId");
  const value = await c.req.arrayBuffer();
  const contentType = c.req.header("Content-Type");
  const path = c.req.path;
  const method = c.req.method;
  let format;
  if (contentType === "image/jpeg") {
    format = "jpeg";
  } else if (contentType === "image/png") {
    format = "png";
  } else {
    console.error(`Error:S101 at ${method} ${path}`);
    throw new HTTPException(400, {
      message: "Unsupported File Format Image only",
    });
  }
  try {
    const baseUrl = "http://localhost:8787/api/single/image/";
    const url = uuid + "." + format;
    await c.env.KV_MY.put(url, value);
    return c.text(`${baseUrl}${url}`);
  } catch (error) {
    console.error(`Error:S101 at ${method} ${path}`);
    throw new HTTPException(401, { message: "General Error" });
  }
});

export default image;
