import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const branch = process.env.WORKERS_CI_BRANCH ?? "";
const wranglerPath = resolve(process.cwd(), "wrangler.toml");

function getStagingVar(key) {
  const content = readFileSync(wranglerPath, "utf8");
  const envStagingIndex = content.indexOf("[env.staging.vars]");

  if (envStagingIndex === -1) {
    return undefined;
  }

  const stagingSection = content.slice(envStagingIndex);
  const match = stagingSection.match(new RegExp(`^${key}\\s*=\\s*"(.*)"$`, "m"));
  return match?.[1];
}

if (branch === "staging") {
  process.env.NEXT_PUBLIC_API_URL ||= getStagingVar("NEXT_PUBLIC_API_URL");
  process.env.NEXT_PUBLIC_SUPABASE_URL ||= getStagingVar("NEXT_PUBLIC_SUPABASE_URL");
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= getStagingVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  const missing = [
    "NEXT_PUBLIC_API_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ].filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required staging build variables: ${missing.join(", ")}`
    );
  }
}

const child = spawn("npx", ["opennextjs-cloudflare", "build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
