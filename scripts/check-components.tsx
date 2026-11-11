import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { GoogleFormEmbed } from "../src/components/GoogleFormEmbed";
import { exampleSession } from "../src/data/content";

assert.equal(
  exampleSession.reduce((minutes, segment) => minutes + segment.minutes, 0),
  120,
  "The sample session must total two hours.",
);

const form = {
  businessName: "Example Community Support",
  contactEmail: "team@community.test",
  googleFormHeight: 1675,
  googleFormEmbedUrl:
    "https://docs.google.com/forms/d/e/example/viewform?embedded=true&usp=sharing",
  googleFormDirectUrl: "",
};

const empty = renderToStaticMarkup(
  <GoogleFormEmbed config={{ ...form, googleFormEmbedUrl: "" }} />,
);
assert.ok(
  !empty.includes("<iframe"),
  "Unconfigured forms must not render a broken iframe.",
);
assert.ok(
  empty.includes(`mailto:${form.contactEmail}`),
  "An unconfigured form must offer email contact.",
);

const configured = renderToStaticMarkup(<GoogleFormEmbed config={form} />);
assert.ok(
  configured.includes("<iframe"),
  "A configured form retains its desktop embed.",
);
assert.ok(
  configured.includes(
    `title="${form.businessName} community partnership inquiry form"`,
  ),
  "The iframe must have a descriptive title.",
);
assert.ok(
  configured.includes('height="1675"'),
  "The embed height comes from configuration.",
);
assert.ok(
  configured.includes(
    'href="https://docs.google.com/forms/d/e/example/viewform?usp=sharing"',
  ),
  "The fallback must remove embedded=true and preserve other query parameters.",
);
assert.ok(
  configured.includes('class="form-embed-panel"') &&
    !configured.includes("inline-form-toggle"),
  "The embedded form must remain available at every viewport width without a disclosure.",
);
assert.ok(
  configured.includes("Open Form in New Tab"),
  "Desktop must retain a visible fallback link.",
);
const unconfiguredEmail = renderToStaticMarkup(
  <GoogleFormEmbed config={{ ...form, googleFormEmbedUrl: "", contactEmail: "" }} />,
);
assert.ok(
  unconfiguredEmail.includes("Google Form not configured") &&
    !unconfiguredEmail.includes("mailto:"),
  "Missing configuration must show a clear placeholder without an unusable email link.",
);

const explicit = renderToStaticMarkup(
  <GoogleFormEmbed
    config={{
      ...form,
      googleFormDirectUrl: "https://docs.google.com/forms/d/e/another/viewform",
    }}
  />,
);
assert.ok(
  explicit.includes(
    'href="https://docs.google.com/forms/d/e/another/viewform"',
  ),
  "A configured direct responder link takes precedence.",
);
assert.equal(
  (explicit.match(/target="_blank" rel="noopener noreferrer"/g) ?? []).length,
  1,
  "The new-tab link must protect the opener.",
);

for (const url of [
  "javascript:alert(1)",
  "https://docs.google.com.evil.example/forms/d/e/test/viewform",
  "https://docs.google.com/forms/d/test/edit",
  "http://docs.google.com/forms/d/e/test/viewform",
]) {
  const result = renderToStaticMarkup(
    <GoogleFormEmbed config={{ ...form, googleFormEmbedUrl: url }} />,
  );
  assert.ok(
    !result.includes("<iframe"),
    `Invalid embed destination must fall back to email: ${url}`,
  );
}
console.info(
  "Verified configured/unconfigured contact forms, embedded access at every width, URL fallbacks, and invalid URL handling. No form requests or submissions were made.",
);
