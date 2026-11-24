import { pendingBio, pendingManifestoLine } from "@/content/pending-copy";

/** Every public sentence that must stay exact lives in this file, except the three pending lines. */

export const oneLinerEn = pendingBio;

export const oneLinerFr = "Productrice et DJ. Noir et blanc. L'IA fait partie des instruments.";

export const noticeEn = "Music and visuals made using AI.";

export const noticeFr = "Musique et visuels réalisés au moyen de l'IA.";

export const copyrightLine = "© 2026 [titulaire à confirmer]";

/**
 * Approved answer when someone asks how the work is made.
 * Rendered only while showLightLine is on, after a real shoot is published.
 */
export const lightLine = "AI is one of the instruments. The light is real.";

export const manifestoBefore = [
  "Light freezes.",
  "Fire slows.",
  "Time leaves a trace.",
] as const;

export const manifestoAfter = [
  pendingManifestoLine,
  "Black and white, because colour explains too much.",
] as const;

export const manifestoClose = "Three chapters. One light.";
