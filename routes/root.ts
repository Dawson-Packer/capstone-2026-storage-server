import { Hono } from "@hono/hono";

const projects = new Hono();

projects.get("/", async (c) => {
  const html = await Deno.readFile("./static/api-docs.html");
  return c.html(new TextDecoder().decode(html));
});
