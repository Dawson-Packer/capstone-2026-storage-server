import { Hono } from "@hono/hono";
import projects from "./routes/projects.ts";
import records from "./routes/records.ts";

const app = new Hono();

app.route("/projects", projects);
app.route("/records", records);

Deno.serve(app.fetch);
