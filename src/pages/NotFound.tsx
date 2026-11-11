import { Button } from "../components/ui";
import { sitePath } from "../config/business";

export function NotFound() {
  return (
    <section className="section not-found container">
      <p className="eyebrow">Page not found</p>
      <h1>
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <p>This page may have moved, or the address may be incomplete.</p>
      <Button href={sitePath()}>Return to Home</Button>
    </section>
  );
}
