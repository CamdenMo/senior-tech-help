import { UserRound, UsersRound, Check } from "lucide-react";
import { services } from "../data/content";
import { Button, ResponsiveImage } from "../components/ui";
import { images } from "../config/images";
import { ContactCTA } from "../components/ContactCTA";

export function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="eyebrow">Technology help, with people at the heart</p>
            <h1>
              Everyday questions.
              <br />
              <em>Patient answers.</em>
            </h1>
            <p className="page-intro">
              Practical, approachable technology assistance for the people who
              call your community home.
            </p>
            <Button>Talk About Your Community’s Needs</Button>
          </div>
          <div className="page-hero-aside">
            <span className="editorial-number">01—06</span>
            <p>
              From staying connected to learning something new, every small step
              matters.
            </p>
          </div>
        </div>
      </section>
      <section className="section service-details">
        <div className="container">
          <div className="details-intro">
            <h2>
              Everyday Technology,
              <br />
              Made Easier.
            </h2>
            <p>
              We help residents understand their own devices, work through
              common challenges, and practice useful skills. There’s always time
              for another question.
            </p>
          </div>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="service-detail">
                <span className="detail-number">0{index + 1}</span>
                <div>
                  <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                </div>
                <div>
                  <p className="small-label">A few ways we can help</p>
                  <ul>
                    {service.examples.map((example) => (
                      <li key={example}>
                        <Check size={17} aria-hidden="true" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
          <p className="scope-note">
            Our focus is everyday technology assistance and education.
            Specialized repairs, cybersecurity services, and financial or
            medical advice are outside that scope. Residents stay in control of
            their devices and accounts.
          </p>
        </div>
      </section>
      <section className="section learning-section">
        <div className="container">
          <div className="learning-header">
            <div>
              <p className="eyebrow">Two ways to learn</p>
              <h2>
                Individual attention.
                <br />
                <em>Shared discoveries.</em>
              </h2>
            </div>
            <p>
              We’ll work with your team to find the right format for your
              residents, your space, and your schedule.
            </p>
          </div>
          <div className="learning-grid">
            <article>
              <UserRound size={28} strokeWidth={1.4} aria-hidden="true" />
              <h3>One-on-one support</h3>
              <p>
                Focused time for a resident’s own questions, on their own
                device. We break tasks into manageable steps, practice together,
                and follow the resident’s pace.
              </p>
              <p className="learning-example">
                A good fit for: setting up a video call, understanding an
                unfamiliar setting, or practicing a new skill.
              </p>
            </article>
            <article>
              <UsersRound size={28} strokeWidth={1.4} aria-hidden="true" />
              <h3>Group workshops</h3>
              <p>
                Approachable sessions around a shared topic, with clear
                demonstrations and time for questions. Learning together can
                open up new conversations.
              </p>
              <p className="learning-example">
                Possible topics: smartphone basics, staying connected with
                family, and recognizing suspicious messages.
              </p>
            </article>
            <ResponsiveImage image={images.workshop} />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
