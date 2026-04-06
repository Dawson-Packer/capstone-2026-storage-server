import { Hono } from "@hono/hono";
import { kv } from "../db/kv.ts";
import { Project, Record } from "../types.ts";

const records = new Hono();

records.get("/:projectId", async (c) => {
  const projectId = c.req.param("projectId");
  console.log(projectId);

  const project = await kv.get<Project>(["projects", projectId]);
  if (!project.value) return c.json({ error: "project not found" }, 404);

  const result: Record[] = [];
  for await (
    const entry of kv.list<Record>({ prefix: ["records", projectId] })
  ) {
    result.push(entry.value);
  }

  return c.json(result);
});

records.post("/:projectId", async (c) => {
  const projectId = c.req.param("projectId");
  console.log(projectId);

  const project = await kv.get<Project>(["projects", projectId]);
  console.log(project.value);

  if (!project.value) return c.json({ error: "project not found" }, 404);

  const { temperature, latitude, longitude, voltage, timestamp } = await c.req
    .json();

  if (
    [temperature, latitude, longitude, voltage].some((v) =>
      typeof v !== "number"
    )
  ) {
    return c.json({
      error:
        "temperature, latitude, longitude, and voltage must all be numbers",
    }, 400);
  }
  if (!timestamp || isNaN(Date.parse(timestamp))) {
    return c.json({ error: "timestamp must be a valid ISO 8601 string" }, 400);
  }

  const record: Record = {
    id: crypto.randomUUID(),
    projectId,
    temperature,
    latitude,
    longitude,
    voltage,
    timestamp,
  };

  await kv.set(["records", projectId, record.id], record);
  return c.json(record, 201);
});

export default records;
