import { readFile, writeFile, mkdir } from "node:fs/promises";
import { loadEnv } from "vite";
import { routes, base, siteUrl, renderPage } from "../.ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
for (const route of [...routes, "404"]) {
  const { html, head } = renderPage(route);
  const output = template
    .replace('<html lang="en">', `<html lang="en" data-route="${route}">`)
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const directory = route && route !== "404" ? `dist/${route}` : "dist";
  await mkdir(directory, { recursive: true });
  await writeFile(
    `${directory}/${route === "404" ? "404" : "index"}.html`,
    output,
  );
}
await writeFile("dist/.nojekyll", "");
let robots = "User-agent: *\nAllow: /\n";
if (siteUrl) {
  const url = new URL(siteUrl);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("VITE_SITE_URL must use https:// or http://.");
  if (`${url.pathname.replace(/\/+$/, "")}/` !== base)
    throw new Error("VITE_SITE_URL path must match VITE_BASE_PATH.");
  const xmlEscape = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  const entries = routes
    .map(
      (route) =>
        `<url><loc>${xmlEscape(`${siteUrl}/${route ? `${route}/` : ""}`)}</loc></url>`,
    )
    .join("\n");
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
  );
  robots += `\nSitemap: ${siteUrl}/sitemap.xml\n`;
} else {
  console.info(
    "VITE_SITE_URL is unset: canonical URLs, absolute social images, and sitemap are omitted until a real production URL is configured.",
  );
}
await writeFile("dist/robots.txt", robots);
const domain = loadEnv("production", process.cwd(), "").SITE_CUSTOM_DOMAIN;
if (domain) {
  if (
    !/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(
      domain,
    )
  )
    throw new Error("SITE_CUSTOM_DOMAIN must be a hostname only.");
  if (base !== "/" || (siteUrl && new URL(siteUrl).hostname !== domain))
    throw new Error(
      "Custom domains require VITE_BASE_PATH=/ and a matching VITE_SITE_URL.",
    );
  await writeFile("dist/CNAME", `${domain}\n`);
}
console.info(
  `Generated ${routes.length} static pages and 404.html (base: ${base}).`,
);
