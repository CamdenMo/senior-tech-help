import { sitePath } from "./business";

/** Locally stored stock placeholders. Replace files or paths and update alt text together. */
export const images = {
  hero: {
    src: sitePath("images/technology-help.jpg"),
    mobileSrc: sitePath("images/technology-help-mobile.jpg"),
    alt: "A technology tutor helping older adults use their laptops in a bright shared learning space",
    width: 1400,
    height: 933,
  },
  workshop: {
    src: sitePath("images/community-learning.jpg"),
    mobileSrc: sitePath("images/community-learning-mobile.jpg"),
    alt: "Older adults learning together with a laptop in a bright shared space",
    width: 1200,
    height: 800,
  },
  founder: {
    src: sitePath("images/founder-placeholder.jpg"),
    mobileSrc: sitePath("images/founder-placeholder-mobile.jpg"),
    alt: "Illustrative stock portrait of a smiling man outdoors; replace with the founder’s photograph",
    width: 900,
    height: 1100,
  },
} as const;
