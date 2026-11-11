import { exampleSession } from "../data/content";
import { SectionHeading } from "./ui";

export function ExampleSession() {
  return (
    <section className="section session-section" aria-labelledby="session-heading">
      <div className="container">
        <SectionHeading
          id="session-heading"
          eyebrow="One example. Two hours of learning together."
          title="What Does a Typical Session Look Like?"
        >
          Here’s how a sample two-hour visit could bring your residents
          together for practical learning and personal support.
        </SectionHeading>
        <ol className="session-grid" role="list">
          {exampleSession.map((segment, index) => (
            <li key={segment.title} className="session-step">
              <span className="session-number" aria-hidden="true">
                0{index + 1}
              </span>
              <p className="small-label">
                {segment.timing} {segment.minutes} Minutes
              </p>
              <h3>{segment.title}</h3>
              <ul role="list">
                {segment.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="session-note">
          <strong>A starting point, shaped around you.</strong> Every community is
          different. Session topics, duration, and format can be customized to
          meet your residents’ needs and your community’s goals.
        </p>
      </div>
    </section>
  );
}
