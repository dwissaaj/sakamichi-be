import { Hono } from "hono";
import single from "./single/single";
import user from "./user/user";
import member from "./member/member";
import group from "./group/group";
const app = new Hono().basePath("/api");

app.get("/", async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely");
});
app.route("/single", single);
app.route("/user", user);
app.route("/member", member)
app.route("/group", group)
export default app;
