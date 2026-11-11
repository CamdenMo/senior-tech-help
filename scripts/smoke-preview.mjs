import assert from "node:assert/strict";
import { preview } from "vite";
import { routes, base } from "../.ssr/entry-server.js";

// HTTP checks exercise the built files, not Vite's development-page fallback.
const server = await preview({
  preview: { host: "127.0.0.1", port: 4178, strictPort: true },
});
try {
  for (const route of routes) {
    const path = `${base}${route ? `${route}/` : ""}`;
    const response = await fetch(`http://127.0.0.1:4178${path}`);
    assert.equal(response.status, 200, `Direct request: ${path}`);
    const html = await response.text();
    assert.ok(
      html.includes(`data-route="${route}"`),
      `${path} must serve its own static page, not a homepage fallback.`,
    );
    const cssPath = html.match(/href="([^"]+\.css)"/)?.[1];
    assert.ok(cssPath, `${path}: stylesheet exists`);
    const css = await fetch(`http://127.0.0.1:4178${cssPath}`);
    assert.equal(css.status, 200, `${path}: stylesheet is served`);
    assert.ok(
      (await css.text()).includes("font-family"),
      `${path}: stylesheet is CSS`,
    );
    console.info(`HTTP 200: ${path} (correct static page and stylesheet)`);
  }
} finally {
  await new Promise((resolve, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : resolve())),
  );
}
