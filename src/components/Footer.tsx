import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Header";
import { business, sitePath } from "../config/business";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand light />
            <p>
              Good technology support.
              <br />A more connected community.
            </p>
          </div>
          <div>
            <p className="footer-label">Explore</p>
            <nav aria-label="Footer navigation">
              <a href={sitePath("services/")}>Our services</a>
              <a href={sitePath("#how-it-works")}>How it works</a>
              <a href={sitePath("about/")}>About us</a>
            </nav>
          </div>
          <div>
            <p className="footer-label">Let’s connect</p>
            <a href={sitePath("contact/")} className="footer-contact">
              Start a conversation
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={`mailto:${business.contactEmail}`}>
              {business.contactEmail}
            </a>
            {business.contactPhone && (
              <a href={`tel:${business.contactPhone.replace(/[^+\d]/g, "")}`}>
                {business.contactPhone}
              </a>
            )}
            {business.serviceArea && (
              <p className="footer-area">Serving {business.serviceArea}</p>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {business.businessName}
          </p>
          <p>Patient support. Personal connections.</p>
        </div>
      </div>
    </footer>
  );
}
