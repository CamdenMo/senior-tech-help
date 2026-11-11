import { renderToString } from "react-dom/server";
import { App } from "./App";
import { business, sitePath } from "./config/business";
import { images } from "./config/images";

export const routes = ["", "services", "about", "contact"];
export const base = sitePath();
export const siteUrl = business.siteUrl;

const meta: Record<string, { title: string; description: string }> = {
  "": {
    title: `${business.businessName} | On-Site Technology Support for Senior Living`,
    description:
      "Patient, personal technology assistance for senior living communities. Partner with us for on-site resident support, technology help sessions, and workshops.",
  },
  services: {
    title: `Resident Technology Services | ${business.businessName}`,
    description:
      "Explore on-site help with smartphones, computers, email, Wi-Fi, online safety, and practical digital skills for residents of senior living communities.",
  },
  about: {
    title: `A Patient, Personal Approach | ${business.businessName}`,
    description: `Meet the approach behind ${business.businessName}: friendly explanations, respect, and patient technology assistance for older adults in your community.`,
  },
  contact: {
    title: `Partner With Us | ${business.businessName}`,
    description:
      "Bring friendly technology assistance to your senior living community. Contact us to discuss resident needs, on-site visits, and group workshops.",
  },
  "404": {
    title: `Page Not Found | ${business.businessName}`,
    description:
      "Find your way back to Community Tech Care and explore technology support for your senior living community.",
  },
};
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );

export function renderPage(route: string) {
  const data = meta[route] || meta["404"];
  const canonical = business.siteUrl
    ? `${business.siteUrl}/${route ? `${route}/` : ""}`
    : "";
  const image = business.siteUrl
    ? new URL(`images/technology-help.jpg`, `${business.siteUrl}/`).href
    : "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: business.businessName,
    ...(business.siteUrl ? { url: business.siteUrl } : {}),
    ...(business.contactEmail && !business.contactEmail.endsWith("@example.com")
      ? { email: business.contactEmail }
      : {}),
    ...(business.contactPhone ? { telephone: business.contactPhone } : {}),
    ...(business.serviceArea ? { areaServed: business.serviceArea } : {}),
    description:
      "On-site technology assistance and education for residents of senior living communities.",
  };
  return {
    html: renderToString(<App route={route} />),
    head: `<title>${escape(data.title)}</title>
<meta name="description" content="${escape(data.description)}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${escape(business.businessName)}" />
<meta property="og:title" content="${escape(data.title)}" />
<meta property="og:description" content="${escape(data.description)}" />
${canonical && route !== "404" ? `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" />` : ""}
${image ? `<meta property="og:image" content="${escape(image)}" /><meta property="og:image:alt" content="${escape(images.hero.alt)}" />` : ""}
${route === "404" ? '<meta name="robots" content="noindex" />' : ""}
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  };
}
