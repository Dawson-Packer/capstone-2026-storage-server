import { Hono } from "@hono/hono";

const root = new Hono();

const html = await fetch(new URL("./static/api-docs.html", import.meta.url))
  .then((r) => r.text());

root.get("/", async (c) => {
  return c.html(html);
});

export default root;
