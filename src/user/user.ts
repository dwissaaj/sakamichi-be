import { Hono } from "hono";
const user = new Hono();

user.get("/", async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely");
});

export default user;
