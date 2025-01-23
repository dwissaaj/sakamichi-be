import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import prismaClients from "../../lib/prisma";
import image from "./image/image";
import {
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
const single = new Hono();

single.get("/all", async (c) => {
  try {
    const prisma = await prismaClients.prisma(c);
    const singles = await prisma.single.findMany();
    return c.json({ singles });
  } catch (error) {
    throw new HTTPException(401, { message: "Error" });
  }
});

single.get("/get/:id", async (c) => {
  const id = c.req.param("id");
  try {
    const prisma = await prismaClients.prisma(c);
    const single = await prisma.single.findUnique({
      where: {
        id: id,
      },
    });
    if (!single) {
      return c.json({ status: 404, message: "No Data with such ID" }, 404);
    }
    return c.json({ single });
  } catch (error) {
    console.log("Error at /single/get unable to get data", error);
    const e = error as PrismaClientKnownRequestError;
    throw new HTTPException(400, { message: `${e.message}` });
  }
});
single.post("/upload", async (c) => {
  const data = await c.req.json();
  try {
    const prisma = await prismaClients.prisma(c);
    const single = await prisma.single.create({
      data: data,
    });
    return c.json( {single} );
  } catch (error) {
    console.error("Error at publish a single", error);
    const e = error as PrismaClientKnownRequestError;
    if (e.code === "P2002") {
      throw new HTTPException(400, {
        message: `${e.message}`,
        cause: `There is data with same ID alias Duplicate`,
      });
    }

    throw new HTTPException(400, {
      message: `${e.message}`,
      cause: `${e.cause}`,
    });
  }
});
single.delete("/remove/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = await prismaClients.prisma(c);
  try {
    const single = await prisma.single.delete({
      where: {
        id: id,
      },
    });

    return c.text("Good! Data is Removed");
  } catch (error) {
    console.log("Log: Delete Single Error", error);
    const e = error as PrismaClientKnownRequestError;
    if (e.code === "P2025") {
      throw new HTTPException(400, {
        message: "Your data have been removed",
        cause: "Your Record have been deleted",
      });
    }
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
    console.log("LOG101: Error at Update", e);
    if (e.code === "P2025") {
      throw new HTTPException(400, {
        message: `${e.message}`,
        cause: "There is no record with that ID",
      });
    }
    throw new HTTPException(400, {
      message: `${e.message}`,
      cause: `${e.cause}`,
    });
  }
});
single.route("/image", image);
export default single;
