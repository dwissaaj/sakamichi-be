import { Hono } from "hono";
const member = new Hono()

member.get("/", async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely");
});

export default member;
