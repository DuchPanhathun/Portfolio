/**
 * Shared content types.
 *
 * All content on this site is sourced from the owner's CV
 * (`CV-Duch-Panhathun.html`). Keeping content in typed modules means a missing
 * or misspelled field is a build error rather than a silently broken page.
 */

export type Profile = {
  name: string;
  role: string;
  /** One-sentence value proposition shown in the hero. */
  tagline: string;
  /** City-level location only — never a residential address on a public site. */
  location: string;
  email: string;
  phone: string;
  /** Longer narrative for the About section. */
  about: string[];
  /** Short credibility facts shown under the hero. */
  highlights: { label: string; value: string }[];
  links: ProfileLinks;
};

/**
 * Any link left as an empty string is hidden from the UI automatically.
 * `github` and `linkedin` are intentionally empty: they do not appear in the
 * CV, and this site does not invent information. Fill them in to reveal them.
 */
export type ProfileLinks = {
  portfolio2D: string;
  portfolio3D: string;
  github: string;
  linkedin: string;
  /** Path to a downloadable CV, e.g. "/cv.pdf". Empty hides the hero button. */
  cv: string;
};

export type SkillGroup = {
  title: string;
  /** Kept deliberately readable — grouped lists, not an exhaustive logo wall. */
  items: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** Organisation or client the work was done for. */
  org: string;
  period: string;
  /** What it is and who it is for, in one or two sentences. */
  summary: string;
  /** The owner's own role, worded as the CV words it. */
  role: string;
  /** The most interesting technical decisions or features. */
  highlights: string[];
  stack: string[];
  featured: boolean;
  /** Optional external links. Empty values are hidden. */
  links?: { label: string; href: string }[];
  /**
   * Optional screenshot. None are available today, so cards are designed to
   * look complete without one. Add files to `public/projects/` and reference
   * them here (e.g. "/projects/ailsa.png") to enable the image slot.
   */
  image?: string;
};

export type ExperienceItem = {
  role: string;
  org: string;
  /** Exactly as written in the CV. */
  period: string;
  note?: string;
  /** Optional grouped sub-sections (used where one role covers two products). */
  groups?: { title: string; points: string[] }[];
  points?: string[];
  stack?: string;
  /** Core roles render in the main timeline; contracts render compactly. */
  kind: "core" | "contract";
};

export type Research = {
  title: string;
  institution: string;
  date: string;
  doi: string;
  doiUrl: string;
  summary: string;
  points: string[];
  metrics: { value: string; label: string }[];
};

export type EducationItem = {
  qualification: string;
  institution: string;
  date: string;
  primary?: boolean;
};

export type Achievement = {
  title: string;
  date: string;
  description: string;
  /** Featured achievements get more visual weight. */
  featured?: boolean;
};

export type VolunteerItem = {
  role: string;
  date: string;
};
