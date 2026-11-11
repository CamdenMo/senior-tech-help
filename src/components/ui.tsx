import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { sitePath } from "../config/business";

export function Button({
  children,
  href = sitePath("contact/"),
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "light" | "outline";
  className?: string;
}) {
  return (
    <a className={`button button-${variant} ${className}`} href={href}>
      <span>{children}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}

export function TextLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowRight size={19} aria-hidden="true" />
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mobileSrc?: string;
};
export function ResponsiveImage({
  image,
  className = "",
  priority = false,
  sizes,
}: {
  image: Photo;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      srcSet={
        image.mobileSrc
          ? `${image.mobileSrc} 720w, ${image.src} ${image.width}w`
          : undefined
      }
      sizes={
        image.mobileSrc
          ? (sizes ?? "(max-width: 900px) 100vw, 50vw")
          : undefined
      }
      className={`responsive-image ${className}`}
    />
  );
}
