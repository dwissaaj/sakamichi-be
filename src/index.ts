import { Hono } from "hono";
import single from "./single/single";
import { HTTPException } from "hono/http-exception";

type Bindings = {
  DB: D1Database;
  KV_MY: KVNamespace
};
const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/", (c) => {
  try {
    let value =  c.env.KV_MY.get("test")
    console.log(value);
    return c.text(`${value} your key`);
  } catch (error) {
    throw new HTTPException(401, { message: "something wrong" });
  }
});
app.route("/single", single);

export default app;
