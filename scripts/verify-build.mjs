import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";
import { routes, base, siteUrl } from "../.ssr/entry-server.js";

const titles = new Set();
for (const route of routes) {
  const html = await readFile(
    `dist/${route ? `${route}/` : ""}index.html`,
    "utf8",
  );
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route}: exactly one h1`,
  );
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route}: title exists`);
  assert.ok(!titles.has(title), `${route}: title must be unique`);
  titles.add(title);
  assert.ok(
    html.includes('name="description"'),
    `${route}: description exists`,
  );
  assert.ok(
    html.includes('id="main-content"'),
    `${route}: skip link target exists`,
  );
  assert.ok(!html.includes("<!--app-html-->"), `${route}: must be prerendered`);
  const navigation = html.match(/<nav id="main-navigation"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(navigation, `${route}: main navigation exists`);
  assert.ok(
    navigation.includes(`href="${base}">Services</a>`),
    `${route}: Services links to the homepage`,
  );
  assert.ok(
    navigation.includes(`href="${base}#contact"`),
    `${route}: Contact links to the homepage contact section`,
  );
  for (const match of html.matchAll(/href="([^"#]*)#([^"#]+)"/g)) {
    const [, path, anchor] = match;
    if (path && !path.startsWith(base)) continue;
    const target = path
      ? await readFile(`dist/${path.slice(base.length)}index.html`, "utf8")
      : html;
    assert.ok(
      target.includes(`id="${anchor}"`),
      `${route}: anchor ${path}#${anchor} has a target`,
    );
  }
  for (const match of html.matchAll(/(?:src|href)="([^"?#]+)"/g)) {
    const url = match[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    assert.ok(
      url.startsWith(base),
      `${route}: asset/link ${url} respects base ${base}`,
    );
    const file = decodeURIComponent(url.slice(base.length));
    await access(
      `dist/${file}${file === "" || file.endsWith("/") ? "index.html" : ""}`,
    );
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/gi)) {
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      assert.ok(url.startsWith(base), `Responsive image respects base: ${url}`);
      await access(`dist/${url.slice(base.length)}`);
    }
  }
  if (siteUrl)
    assert.ok(
      html.includes('rel="canonical"'),
      `${route}: canonical configured`,
    );
}
await access("dist/404.html");
await access("dist/robots.txt");
if (siteUrl) await access("dist/sitemap.xml");
for (const file of await readdir("dist/assets")) {
  if (!file.endsWith(".css")) continue;
  const css = await readFile(`dist/assets/${file}`, "utf8");
  for (const match of css.matchAll(/url\(["']?(\/[^)"']+)["']?\)/g)) {
    assert.ok(
      match[1].startsWith(base),
      `CSS asset respects base: ${match[1]}`,
    );
    await access(`dist/${match[1].slice(base.length)}`);
  }
}
console.info(
  "Verified static routes, unique titles, heading hierarchy, local links/assets, SEO output, and base paths.",
);
