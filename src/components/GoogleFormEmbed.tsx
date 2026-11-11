import { ExternalLink, ClipboardList } from "lucide-react";
import { useState } from "react";
import { business } from "../config/business";

function validGoogleForm(url: string) {
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname === "docs.google.com" &&
      !parsed.username &&
      !parsed.password &&
      /^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[^/]+\/viewform\/?$/.test(
        parsed.pathname,
      )
    );
  } catch {
    return false;
  }
}

type FormConfig = Pick<
  typeof business,
  | "businessName"
  | "googleFormEmbedUrl"
  | "googleFormDirectUrl"
  | "googleFormHeight"
  | "contactEmail"
>;

export function GoogleFormEmbed({
  config = business,
}: { config?: FormConfig } = {}) {
  const [showInlineForm, setShowInlineForm] = useState(false);
  const configured = validGoogleForm(config.googleFormEmbedUrl);
  const fallbackUrl = configured ? new URL(config.googleFormEmbedUrl) : null;
  fallbackUrl?.searchParams.delete("embedded");
  const directUrl = validGoogleForm(config.googleFormDirectUrl)
    ? config.googleFormDirectUrl
    : (fallbackUrl?.href ?? "");
  if (!configured)
    return (
      <div className="form-placeholder">
        <ClipboardList size={38} strokeWidth={1.3} aria-hidden="true" />
        <p className="eyebrow">Let’s start a conversation</p>
        <h2>
          Tell us about
          <br />
          your community.
        </h2>
        <p>
          Our community inquiry form is coming soon. In the meantime, reach out
          by email to discuss your residents’ technology needs.
        </p>
        <a
          className="button button-primary"
          href={`mailto:${config.contactEmail}`}
        >
          Email Us
          <ExternalLink size={18} aria-hidden="true" />
        </a>
        <p className="form-note">
          Please don’t include resident passwords, account details, or other
          sensitive personal information.
        </p>
      </div>
    );
  return (
    <div className="google-form">
      <div className="form-toolbar">
        <p>Community partnership inquiry</p>
        <a
          className="desktop-form-link"
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Form in New Tab
          <ExternalLink size={16} aria-hidden="true" />
        </a>
        <div className="mobile-form-intro">
          <h2>A little about your community. A helpful next step.</h2>
          <p>
            Open our inquiry form in a new tab for a comfortable, full-screen
            experience.
          </p>
          <a
            className="button button-primary"
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Open Contact Form</span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-form-toggle"
            aria-controls="inline-contact-form"
            aria-expanded={showInlineForm}
            onClick={() => setShowInlineForm((current) => !current)}
          >
            {showInlineForm
              ? "Hide embedded form"
              : "Prefer to fill it out here?"}
          </button>
        </div>
      </div>
      <div
        id="inline-contact-form"
        className={`form-embed-panel ${showInlineForm ? "is-expanded" : ""}`}
      >
        <iframe
          title={`${config.businessName} community partnership inquiry form`}
          src={config.googleFormEmbedUrl}
          width="100%"
          height={config.googleFormHeight}
          className="form-iframe"
          loading="lazy"
        >
          Loading the community inquiry form.
        </iframe>
      </div>
      <p className="form-note">
        This form is hosted by Google. Please don’t share sensitive resident
        information.
      </p>
    </div>
  );
}
