import { Button } from "./ui";

export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">A more connected community starts here</p>
          <h2>
            Let’s Make Technology
            <br className="desktop-break" /> Easier for Your Residents.
          </h2>
          <p>
            Tell us about your community, and let’s explore how on-site
            technology assistance could support your residents.
          </p>
        </div>
        <Button variant="light">Get in Touch</Button>
      </div>
    </section>
  );
}
