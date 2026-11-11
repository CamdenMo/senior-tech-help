import { ExternalLink, ClipboardList } from "lucide-react";
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
  const configured = validGoogleForm(config.googleFormEmbedUrl);
  const fallbackUrl = configured ? new URL(config.googleFormEmbedUrl) : null;
  fallbackUrl?.searchParams.delete("embedded");
  const directUrl = validGoogleForm(config.googleFormDirectUrl)
    ? config.googleFormDirectUrl
    : (fallbackUrl?.href ?? "");
  const hasContactEmail =
    config.contactEmail && !config.contactEmail.endsWith("@example.com");
  if (!configured)
    return (
      <div className="form-placeholder">
        <ClipboardList size={38} strokeWidth={1.3} aria-hidden="true" />
        <p className="eyebrow">Google Form not configured</p>
        <h2>
          Tell us about
          <br />
          your community.
        </h2>
        <p>
          Our community inquiry form will appear here once it’s connected.
          {hasContactEmail &&
            " In the meantime, email us to discuss your residents’ technology needs."}
        </p>
        {hasContactEmail && (
          <a
            className="button button-primary"
            href={`mailto:${config.contactEmail}`}
          >
            Email Us
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        )}
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
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Form in New Tab
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
      <div className="form-embed-panel">
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
