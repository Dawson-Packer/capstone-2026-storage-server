import { Hono } from "@hono/hono";

const root = new Hono();

root.get("/", async (c) => {
  const html = await Deno.readFile("./static/api-docs.html");
  return c.html(new TextDecoder().decode(html));
});

export default root;
