import type { steps } from "../data/content";

export function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <li className="process-step">
      <span className="step-number" aria-hidden="true">
        0{index + 1}
      </span>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </li>
  );
}
