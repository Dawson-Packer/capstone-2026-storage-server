import { Hono } from "@hono/hono";
import { kv } from "../db/kv.ts";
import { Project } from "../types.ts";

const projects = new Hono();

projects.get("/", async (c) => {
  const result: Project[] = [];
  for await (const entry of kv.list<Project>({ prefix: ["projects"] })) {
    result.push(entry.value);
  }

  return c.json(result);
});

projects.post("/", async (c) => {
  const { name } = await c.req.json();
  if (!name) return c.json({ error: "name is required" }, 400);

  for await (const entry of kv.list<Project>({ prefix: ["projects"] })) {
    if (entry.value.name === name) {
      return c.json({ error: "a project with that name already exists" }, 409);
    }
  }

  const project: Project = {
    id: crypto.randomUUID(),
    name,
  };

  await kv.set(["projects", project.id], project);
  return c.json(project, 201);
});

export default projects;
