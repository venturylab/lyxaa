import type { PlatformKey } from "@/content/links";
import { copyrightLine, noticeEn, oneLinerEn } from "@/content/lines";
import { artistName } from "@/site.config";

export const platformLabels: Record<PlatformKey, string> = {
  appleMusic: "Apple Music",
  deezer: "Deezer",
  youtube: "YouTube",
  tidal: "TIDAL",
  amazonMusic: "Amazon Music",
  spotify: "Spotify",
};

export const eventTypeOptions = [
  { value: "club", label: "Club" },
  { value: "brand", label: "Brand event" },
  { value: "festival", label: "Festival" },
  { value: "private", label: "Private event" },
  { value: "other", label: "Other" },
] as const;

export const budgetOptions = [
  { value: "under-2000", label: "Under 2,000 EUR" },
  { value: "2000-5000", label: "2,000–5,000 EUR" },
  { value: "5000-15000", label: "5,000–15,000 EUR" },
  { value: "over-15000", label: "Over 15,000 EUR" },
] as const;

export const en = {
  skip: "Skip to content",
  opensInNewTab: "Opens in a new tab",
  nav: [
    { href: "/music", label: "Music" },
    { href: "/live", label: "Live" },
    { href: "/press", label: "Press" },
  ],
  footer: {
    navLabel: "Footer",
    legal: "Legal notice",
    privacy: "Privacy",
    frenchPress: "Presse",
    listen: "Listen",
    copyright: copyrightLine,
    notice: noticeEn,
    preview: "Preview",
  },
  home: {
    description: oneLinerEn,
    tagline: oneLinerEn,
    intro: `TRIPTYQUE is the current release: three tracks. On stage, ${artistName} plays a DJ set for clubs and brand events.`,
    releaseKicker: "Current release",
    viewRelease: "View the release",
    indexLabel: "Pages",
    index: [
      { href: "/music", label: "Music", text: "TRIPTYQUE, track by track." },
      { href: "/live", label: "Live", text: "Dates and booking." },
      {
        href: "/press",
        label: "Press",
        text: "Biography, rider, and photographs.",
      },
    ],
  },
  music: {
    title: "Music",
    description: `TRIPTYQUE, the current release by ${artistName}: Underneath the Strobe Lights, Quiet Fire, and Keep the Time.`,
    kicker: "Music",
    lede: "Three tracks. Each listening link opens on the platform, in a new tab.",
    released: "Released",
    spotifyNote:
      "Spotify links will be added when verified addresses are available.",
    comingSoon: "Coming soon",
    comingSoonAlso: "Bientôt disponible",
    linksLabel: "Listening links",
    artistHeading: "Artist",
    artistLabel: "Artist pages",
  },
  live: {
    title: "Live & booking",
    description: "A DJ set for clubs and brand events. Dates and booking.",
    kicker: "Live",
    heading: "Live & booking",
    lede: "A DJ set for clubs and brand events.",
    body: `${artistName} plays a DJ set for clubs and brand events.`,
    datesHeading: "Dates",
    datesEmpty: "No dates announced.",
    datesNote: "Confirmed dates will be listed here.",
    bookingHeading: "Booking",
    bookingIntro:
      "For a club date or a brand event, send a request. In this preview, a valid form is accepted and is not forwarded.",
  },
  booking: {
    name: "Name",
    company: "Company or venue",
    email: "Email",
    eventType: "Event type",
    eventTypePlaceholder: "Select",
    date: "Date",
    city: "City",
    budget: "Budget range",
    budgetOptional: "Optional. These bands are provisional.",
    budgetPlaceholder: "No range given",
    message: "Message",
    consent: "I agree to be contacted about this request.",
    submit: "Send request",
    sending: "Sending…",
    errorSummary: "The form needs a few corrections.",
    successPreview:
      "Thank you. The request is valid. Nothing was sent: no booking provider is connected in this preview.",
    successSent: "Thank you. The request has been sent.",
    errors: {
      name: "Enter a name (at least 2 characters).",
      company: "Enter a company or a venue.",
      email: "Enter a valid email address.",
      eventType: "Choose an event type.",
      date: "Enter a valid date.",
      city: "Enter a city.",
      budget: "Choose a budget range, or leave the field empty.",
      message: "Enter a message (at least 10 characters).",
      consent: "Consent is required before sending.",
      form: "The form could not be read. Try again.",
      send: "The request could not be sent. Try again later.",
      config: "The booking provider is not configured correctly.",
    },
    htmlBack: "Back to the form",
  },
  press: {
    title: "Press",
    description: `Press kit for ${artistName}: biography, discography, technical rider, and photographs.`,
    kicker: "Press kit",
    heading: "Press",
    languageLabel: "Language",
    shortHeading: "Short biography",
    shortBio: oneLinerEn,
    notice: noticeEn,
    longHeading: "Long biography",
    longBio:
      "[Placeholder — the long biography will be supplied by the music team.]",
    discoHeading: "Discography",
    discoNote: "Listening links are on the Music page.",
    released: "Released",
    riderHeading: "Technical rider",
    rider:
      "[Placeholder — the technical rider will be supplied by the music team.]",
    photosHeading: "Photographs",
    photosNote:
      "The frames below keep their ratios. Press photographs will replace them.",
    photoAlts: [
      "Press photograph placeholder, frame 1",
      "Press photograph placeholder, frame 2",
      "Press photograph placeholder, frame 3",
    ],
    epkHeading: "Electronic press kit",
    epk: "[Placeholder — the downloadable press kit will be supplied by the music team.]",
    bookingHeading: "Booking",
    booking:
      "Date requests go through the form. A direct address is not published yet.",
    bookingCta: "Open the form",
  },
  legal: {
    title: "Legal notice",
    description: "Placeholder for the legal notice.",
    kicker: "Legal",
    heading: "Legal notice",
    lede: "This page is a placeholder. The legal team will supply the legal notice.",
    body: "The text on this page is not a legal notice. The publisher, the host, and the publication details will be added before any public launch.",
  },
  privacy: {
    title: "Privacy",
    description: "Placeholder for the privacy policy.",
    kicker: "Legal",
    heading: "Privacy",
    lede: "This page is a placeholder. The legal team will supply the privacy policy.",
    body: "The text on this page is not a privacy policy. This preview sets no cookies, uses no analytics, and does not store booking requests. If a provider is connected later, the policy must describe that processing before launch.",
  },
  notFound: {
    title: "Page not found",
    description: "This address does not match a page.",
    heading: "Page not found",
    body: "This address does not match a page.",
    home: `Back to ${artistName}`,
  },
} as const;
