import { Hono } from "@hono/hono";
import html from "../static/api-docs.html" with { type: "text" };

const root = new Hono();

root.get("/", async (c) => {
  return c.html(html);
});

export default root;
