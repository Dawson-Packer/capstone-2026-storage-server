import { Hono } from "@hono/hono";
import root from "./routes/root.ts";
import projects from "./routes/projects.ts";
import records from "./routes/records.ts";

const app = new Hono();

app.route("/", root);
app.route("/projects", projects);
app.route("/records", records);

Deno.serve(app.fetch);
