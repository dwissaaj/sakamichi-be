import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import prismaClients from "../../lib/prisma";
import image from "./image/image";
import {
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
const single = new Hono();

single.get("/all", async (c) => {
  const path = c.req.path;
  const method = c.req.method;
  try {
    const prisma = await prismaClients.prisma(c);
    const singles = await prisma.single.findMany();
    return c.json({ singles });
  } catch (error) {
    console.error(`ERROR:S101 at ${method} ${path}`);
    throw new HTTPException(401, { message: "Error" });
  }
});

single.get("/get/:id", async (c) => {
  const id = c.req.param("id");
  const path = c.req.path;
  const method = c.req.method;
  try {
    const prisma = await prismaClients.prisma(c);
    const single = await prisma.single.findUnique({
      where: {
        id: id,
      },
    });
    if (!single) {
      console.error(`ERROR:S102 at ${method} ${path}`);
      return c.json({ status: 404, message: "No Data with such ID" }, 404);
    }
    return c.json({ single });
  } catch (error) {
    console.error(`Error:S101 at ${method} ${path}`, error);
    const e = error as PrismaClientKnownRequestError;
    throw new HTTPException(400, { message: `${e.message}` });
  }
});
single.post("/upload", async (c) => {
  const data = await c.req.json();
  const path = c.req.path;
  const method = c.req.method;
  try {
    const prisma = await prismaClients.prisma(c);
    const single = await prisma.single.create({
      data: data,
    });
    return c.json( {single} );
  } catch (error) {
    
    const e = error as PrismaClientKnownRequestError;
    if (e.code === "P2002") {
      console.error(`Error:S103 at ${method} ${path}`, error);
      throw new HTTPException(400, {
        message: `${e.message}`,
        cause: `There is data with same ID alias Duplicate`,
      });
    }
    console.error(`Error:S101 at ${method} ${path}`, error);
    throw new HTTPException(400, {
      message: `${e.message}`,
      cause: `${e.cause}`,
    });
  }
});
single.delete("/remove/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = await prismaClients.prisma(c);
  const path = c.req.path;
  const method = c.req.method;
  try {
    await prisma.single.delete({
      where: {
        id: id,
      },
    });

    return c.text("Good! Data is Removed");
  } catch (error) {
    
    const e = error as PrismaClientKnownRequestError;
    if (e.code === "P2025") {
      console.error(`Error:S104 at ${method} ${path}`, error);
      throw new HTTPException(400, {
        message: "Your data have been removed",
        cause: "Your Record have been deleted",
      });
    }
    console.error(`Error:S101 at ${method} ${path}`, error);
    throw new HTTPException(400, {
      message: `${e.message}`,
      cause: `${e.cause}`
    });
  }
});
single.patch("/update/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = await prismaClients.prisma(c);
  const body = await c.req.json();
  const path = c.req.path;
  const method = c.req.method;
  try {
    const single = await prisma.single.update({
      where: {
        id: id,
      },
      data: body,
    });

    return c.json({ single });
  } catch (error) {
    const e = error as PrismaClientKnownRequestError;
    
    if (e.code === "P2025") {
      console.error(`Error:S102 at ${method} ${path}`, error);
      throw new HTTPException(400, {
        message: `${e.message}`,
        cause: "There is no record with that ID",
      });
    }
    console.error(`Error:S101 at ${method} ${path}`, error);
    throw new HTTPException(400, {
      message: `${e.message}`,
      cause: `${e.cause}`,
    });
  }
});
single.route("/image", image);
export default single;
