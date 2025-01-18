import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import cloudFlareClients from "../../lib/cloudflare";
const app = new Hono();

app.get("image/:key", async (c) => {
  const key = c.req.param("key")
  try {
    const data = await cloudFlareClients.get(key, c)
    console.log("your data", data)
    return c.text(`${data} your key`);
  } catch (error) {
    console.log("error", error)
    throw new HTTPException(401, { message: "something wrong" });
  }
});
app.put("/image", async (c) =>{
  try {
      const data = await cloudFlareClients.put("test3", "success 3", c)
      console.log("yourdata", data)
      return c.text(`${data} success `)
  } catch (error) {
    throw new HTTPException(401, {message: "Error"})
  }
})

export default app;
