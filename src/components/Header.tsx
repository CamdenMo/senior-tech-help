import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { business, sitePath } from "../config/business";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href={sitePath()}
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label={`${business.businessName} home`}
    >
      <svg
        className="brand-mark"
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <rect width="40" height="40" rx="11" fill="currentColor" />
        <path
          d="M10 24a10 10 0 0 1 20 0M15 31h10"
          stroke="var(--cream)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="12" r="3.5" fill="var(--sage)" />
      </svg>
      <span>{business.businessName}</span>
    </a>
  );
}

const links = [
  ["Home", ""],
  ["Services", "services/"],
  ["How It Works", "#how-it-works"],
  ["About", "about/"],
  ["Contact", "contact/"],
] as const;

export function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    // Keep the page still on touch devices, and prevent focus reaching covered content.
    const page = document.documentElement;
    const body = document.body;
    const previousPageOverflow = page.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - page.clientWidth;
    const coveredContent = Array.from(
      document.querySelectorAll<HTMLElement>("main, .site-footer, .skip-link"),
    );
    const previousInert = coveredContent.map((element) => element.inert);

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    }
    page.style.overflow = "hidden";
    body.style.overflow = "hidden";
    coveredContent.forEach((element) => {
      element.inert = true;
    });

    const closeAndFocus = () => {
      setOpen(false);
      menuButton.current?.focus();
    };
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAndFocus();
      }
      if (event.key === "Tab") {
        const controls = Array.from(
          header.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          ) ?? [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      )
        closeAndFocus();
    };
    const desktop = window.matchMedia("(min-width: 1060px)");
    const closeDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeDesktop);
    return () => {
      page.style.overflow = previousPageOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousPadding;
      coveredContent.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.removeEventListener("keydown", handleKeyboard);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeDesktop);
    };
  }, [open]);
  return (
    <>
      <header
        className={`site-header ${open ? "is-menu-open" : ""}`}
        ref={header}
      >
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`navigation ${open ? "is-open" : ""}`}
          >
            {links.map(([label, path]) => (
              <a
                key={label}
                href={sitePath(path)}
                aria-current={
                  path === (route ? `${route}/` : "") ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-cta"
              href={sitePath("contact/")}
              onClick={() => setOpen(false)}
            >
              Partner With Us
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>
      {open && <div className="nav-backdrop" aria-hidden="true" />}
    </>
  );
}
