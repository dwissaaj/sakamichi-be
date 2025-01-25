import { Hono } from "hono";
const group = new Hono()

group.get("/all", async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely");
});

export default group;
