import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { business } from "../config/business";
import { GoogleFormEmbed } from "../components/GoogleFormEmbed";

export function Contact({ homepage = false }: { homepage?: boolean }) {
  const Heading = homepage ? "h2" : "h1";
  return (
    <section
      id="contact"
      className="section contact-page"
      aria-labelledby="contact-heading"
    >
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">For community teams who care</p>
          <Heading id="contact-heading">
            Bring Technology Support to <em>Your Community.</em>
          </Heading>
          <p className="page-intro">
            Property managers and community administrators: let’s talk about
            scheduling in-person technology education and support for your senior
            apartments or senior living community. We’ll work with you to customize
            topics, session length, and format around your residents’ needs.
          </p>
          <div className="direct-contact">
            {business.contactEmail && (
              <a href={`mailto:${business.contactEmail}`}>
                <Mail size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <span className="contact-label">Email us directly</span>
                  {business.contactEmail}
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            )}
            {business.contactPhone && (
              <a href={`tel:${business.contactPhone.replace(/[^+\d]/g, "")}`}>
                <Phone size={22} aria-hidden="true" />
                <span>
                  <span className="contact-label">Give us a call</span>
                  {business.contactPhone}
                </span>
              </a>
            )}
            {business.serviceArea && (
              <p>
                <MapPin size={22} aria-hidden="true" />
                {business.serviceArea}
              </p>
            )}
          </div>
        </div>
        <GoogleFormEmbed />
        <div className="contact-followup">
          <div className="what-next">
            <h2>What happens next?</h2>
            <ol>
              <li>
                <span>01</span>
                <p>
                  We’ll review your inquiry and get in touch to learn more about
                  your community.
                </p>
              </li>
              <li>
                <span>02</span>
                <p>
                  We’ll talk through resident needs, service formats, and what a
                  helpful partnership could look like.
                </p>
              </li>
              <li>
                <span>03</span>
                <p>
                  If it’s a good fit, we’ll coordinate the next steps with your
                  team.
                </p>
              </li>
            </ol>
          </div>
          <p className="contact-note">
            A conversation is a great place to start. No resident information is
            needed to explore a partnership.
          </p>
        </div>
      </div>
    </section>
  );
}
