import type { services } from "../data/content";

export function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  return (
    <article className="service-item">
      <div className="service-item-top">
        <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
        <span aria-hidden="true">0{index + 1}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}
