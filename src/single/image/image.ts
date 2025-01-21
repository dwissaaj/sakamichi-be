import { Context, Hono } from "hono";
import { env } from "hono/adapter";
import { HTTPException } from "hono/http-exception";
import { requestId } from "hono/request-id";
type Bindings = {
  DB: D1Database;
  KV_MY: KVNamespace;
};

const image = new Hono<{ Bindings: Bindings }>();
image.use("*", requestId());
image.get("/:key", async (c) => {
  const key = c.req.param("key");
  const {routes} = env<{ routes: string }>(c)
  console.log("url", routes)
  try {
    const image = await c.env.KV_MY.get(key, { type: "arrayBuffer" });
    if (!image) {
      throw new HTTPException(404, {
        message: "Image is not found",
      });
    }
    c.status(200);
    c.header("Content-Type", "image/jpeg");
    c.header("Conten-Type", "image/png");
    return c.body(image);
  } catch (error) {
    console.log("error", error);
    throw new HTTPException(401, { message: "something wrong" });
  }
});
image.put("/upload", async (c) => {
  const uuid = c.get("requestId");

  const value = await c.req.arrayBuffer();
  const contentType = c.req.header("Content-Type");

  let format;
  if (contentType === "image/jpeg") {
    format = "jpeg";
  } else if (contentType === "image/png") {
    format = "png";
  } else {
    throw new HTTPException(400, {
      message: "Unsupported File Format Image only",
    });
  }
  try {
    const url = uuid + "." + format;
    await c.env.KV_MY.put(url, value);
    return c.text(`${url}`);
  } catch (error) {
    throw new HTTPException(401, { message: `Error ${error}` });
  }
});

export default image;
