import { HeartHandshake, MapPin, Coffee, ArrowDown, Check } from "lucide-react";
import { images } from "../config/images";
import { business, sitePath } from "../config/business";
import { services, steps, partnershipOptions } from "../data/content";
import {
  Button,
  TextLink,
  SectionHeading,
  ResponsiveImage,
} from "../components/ui";
import { ServiceItem } from "../components/ServiceItem";
import { ProcessStep } from "../components/ProcessStep";
import { PartnershipOption } from "../components/PartnershipOption";
import { ContactCTA } from "../components/ContactCTA";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              People first. Technology second.
            </p>
            <h1>
              Technology Support That Comes to <em>Your Community.</em>
            </h1>
            <p className="hero-description">
              Friendly, professional technology assistance for senior living
              communities. We help residents navigate everyday technology with
              patience, confidence, and a personal touch.
            </p>
            <div className="hero-actions">
              <Button>Bring Tech Support to Your Community</Button>
              <TextLink href={sitePath("services/")}>
                Explore Our Services
              </TextLink>
            </div>
            <p className="hero-note">
              <Check size={17} aria-hidden="true" />
              On-site support, thoughtfully coordinated with your team.
            </p>
          </div>
          <div className="hero-visual">
            <ResponsiveImage image={images.hero} priority />
            <div className="photo-caption">
              <span className="caption-dot" />
              <p>
                A little guidance.
                <br />
                <strong>A lot more confidence.</strong>
              </p>
            </div>
            <span className="hero-photo-label">
              Personal support. Right at home.
            </span>
          </div>
        </div>
        <div className="container hero-bottom">
          <p>For senior apartments & senior living communities</p>
          <a
            href="#why-it-matters"
            aria-label="Discover the benefits for your community"
          >
            <ArrowDown size={18} aria-hidden="true" />
          </a>
          <p>Thoughtful support. Meaningful connections.</p>
        </div>
      </section>

      <section id="why-it-matters" className="section value-section">
        <div className="container value-grid">
          <SectionHeading
            eyebrow="Good for residents. Good for your community."
            title="A Better Experience for Residents. One Less Thing for Your Team."
          >
            Technology questions are part of everyday life. Having someone
            patient to turn to can make all the difference.
          </SectionHeading>
          <div className="benefits">
            <article>
              <HeartHandshake size={26} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <h3>More confidence. More connection.</h3>
                <p>
                  Help residents feel more comfortable using the technology that
                  connects them to family, friends, and everyday life.
                </p>
              </div>
            </article>
            <article>
              <MapPin size={26} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <h3>Helpful support, right where they live.</h3>
                <p>
                  Convenient on-site assistance brings personalized help into
                  the familiar surroundings of your community.
                </p>
              </div>
            </article>
            <article>
              <Coffee size={26} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <h3>A little breathing room for your team.</h3>
                <p>
                  Give staff a dedicated resource for everyday technology
                  questions, so they can focus on caring for your community.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-topline">
            <SectionHeading
              eyebrow="Practical help. Everyday possibilities."
              title="Everyday Technology, Made Easier."
            >
              From a first video call to a familiar device that’s acting
              unfamiliar, we meet residents where they are.
            </SectionHeading>
            <TextLink href={sitePath("services/")}>View All Services</TextLink>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceItem
                key={service.title}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section process-section">
        <div className="container">
          <SectionHeading
            className="centered"
            eyebrow="A simple start. A personal approach."
            title="Simple for Your Community. Helpful for Every Resident."
          />
          <ol className="process-grid" role="list">
            {steps.map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </section>

      <section className="section partnership-section">
        <div className="container partnership-grid">
          <div className="partnership-visual">
            <ResponsiveImage image={images.workshop} />
            <div className="image-footnote">
              <span>Learning together. Connecting more.</span>
              <span aria-hidden="true">01 — 04</span>
            </div>
          </div>
          <div className="partnership-copy">
            <SectionHeading
              eyebrow="An amenity with a human touch"
              title="Technology Support as a Resident Amenity."
            >
              A thoughtful addition to your resident services, with support
              options shaped around your community’s needs.
            </SectionHeading>
            <p className="small-label">Available service formats</p>
            <ul className="partnership-options">
              {partnershipOptions.map((option) => (
                <PartnershipOption key={option}>{option}</PartnershipOption>
              ))}
            </ul>
            <Button>Discuss a Partnership</Button>
          </div>
        </div>
      </section>

      <section className="about-preview">
        <div className="container about-preview-grid">
          <div className="founder-small">
            <ResponsiveImage
              image={images.founder}
              sizes="(max-width: 900px) 180px, (max-width: 1150px) 210px, 230px"
            />
            <p>Founder portrait placeholder</p>
          </div>
          <div>
            <SectionHeading
              eyebrow={`The person behind ${business.businessName}`}
              title="A Familiar Face. A Patient Approach."
            />
            <p>
              Technology is easier to explore when there’s someone beside you
              who’s happy to explain it again. And again, if needed.
            </p>
            <p>
              Our founder’s approach is simple: listen first, use clear
              language, and help each person build confidence at their own pace.
              Every question deserves time and respect.
            </p>
            <TextLink href={sitePath("about/")}>Get to Know Us</TextLink>
          </div>
          <span className="about-aside">
            A human approach
            <br />
            to a digital world.
          </span>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
