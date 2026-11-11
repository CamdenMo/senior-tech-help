/** Edit business details here. Empty strings intentionally hide unconfigured fields. */
export const business = {
  businessName: "Community Tech Care",
  founderName: "Founder Name", // Replace before launch.
  contactEmail: "", // Add the real contact email before launch.
  contactPhone: "", // Optional, e.g. +1 (555) 123-4567.
  googleFormEmbedUrl: "", // https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
  googleFormDirectUrl: "", // https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
  googleFormHeight: 1500, // Adjust to the published form, then check on mobile.
  serviceArea: "Based in Southeastern Wisconsin",
  siteUrl: (import.meta.env.VITE_SITE_URL || "").replace(/\/+$/, ""),
};

export const basePath = import.meta.env.BASE_URL;
export const sitePath = (path = "") => `${basePath}${path.replace(/^\/+/, "")}`;
