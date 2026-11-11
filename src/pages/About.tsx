import { Heart, MessageCircle, HandHelping } from "lucide-react";
import { business } from "../config/business";
import { images } from "../config/images";
import { ResponsiveImage, Button } from "../components/ui";
import { ContactCTA } from "../components/ContactCTA";

export function About() {
  return (
    <>
      <section className="section about-hero">
        <div className="container about-hero-grid">
          <figure>
            <ResponsiveImage image={images.founder} priority />
            <figcaption>
              Illustrative portrait — founder photograph to come.
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow">Meet the person behind the support</p>
            <h1>
              A Familiar Face.
              <br />
              <em>A Patient Approach.</em>
            </h1>
            <p className="founder-name">
              {business.founderName}
              <span>Founder, {business.businessName}</span>
            </p>
            <p>
              There’s a human side to every technology question. Sometimes it’s
              a photo someone wants to share. A call they don’t want to miss. Or
              a device they’d simply like to understand a little better.
            </p>
            <p>
              {business.businessName} is built around making those everyday
              moments easier, with friendly, personal technology assistance in
              senior living communities.
            </p>
            <Button>Let’s Get to Know Your Community</Button>
          </div>
        </div>
      </section>
      <section className="section philosophy-section">
        <div className="container philosophy-grid">
          <div>
            <p className="eyebrow">Why this work matters</p>
            <h2>
              More comfortable
              <br />
              with technology.
              <br />
              <em>More connected to life.</em>
            </h2>
          </div>
          <div>
            <p className="lead">
              Getting help should feel comfortable. Asking a question should
              never feel like an interruption.
            </p>
            <p>
              Our founder enjoys helping people feel more at ease with
              technology. The approach begins with listening: what would this
              person like to do, and what’s getting in the way?
            </p>
            <p>
              By bringing support into residential communities, we make space
              for practical learning in a familiar setting. We work with
              community management to offer a thoughtful resident amenity, built
              around real questions and individual needs.
            </p>
          </div>
        </div>
      </section>
      <section className="section approach-section">
        <div className="container">
          <p className="eyebrow">What residents can expect</p>
          <h2>
            Support with respect,
            <br />
            every step of the way.
          </h2>
          <div className="approach-grid">
            {[
              {
                icon: Heart,
                title: "Patience, always.",
                copy: "We work at each person’s pace, welcome repeated questions, and allow time to practice. There’s no rush to keep up.",
              },
              {
                icon: MessageCircle,
                title: "Clarity over jargon.",
                copy: "Familiar words, simple steps, and practical examples help residents understand what they’re doing and why.",
              },
              {
                icon: HandHelping,
                title: "Help that empowers.",
                copy: "Residents stay involved and in control. We guide, encourage, and respect personal choices, privacy, and comfort levels.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <article key={title}>
                <Icon size={28} strokeWidth={1.4} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
