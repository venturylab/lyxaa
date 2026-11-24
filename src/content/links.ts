/**
 * Every outbound address on the site lives in this file.
 * An empty string hides the button. Do not invent an address.
 * Titles, numerals, and release dates are stored here as supplied.
 * Do not reformat the dates.
 */

export const platformOrder = [
  "appleMusic",
  "deezer",
  "youtube",
  "tidal",
  "amazonMusic",
  "spotify",
] as const;

export type PlatformKey = (typeof platformOrder)[number];

export type TrackLinkMap = Record<PlatformKey, string>;

export type ReleaseTrack = {
  numeral: "I" | "II" | "III";
  title: string;
  released: string;
  links: TrackLinkMap;
};

export const release = {
  title: "TRIPTYQUE",
  tracks: [
    {
      numeral: "I",
      title: "Underneath the Strobe Lights",
      released: "11/11/2026",
      links: {
        appleMusic:
          "https://music.apple.com/fr/album/underneath-the-strobe-lights/6833586652?i=6833586653",
        deezer: "https://www.deezer.com/track/4407964681",
        youtube: "https://www.youtube.com/watch?v=tmXV1Zfir4w",
        tidal: "https://tidal.com/track/578180033",
        amazonMusic:
          "https://music.amazon.com/albums/B0HRC3L4JG?trackAsin=B0HRC79K16",
        spotify: "",
      },
    },
    {
      numeral: "II",
      title: "Quiet Fire",
      released: "04/11/2026",
      links: {
        appleMusic:
          "https://music.apple.com/fr/album/quiet-fire/6830906618?i=6830906619",
        deezer: "",
        youtube: "https://www.youtube.com/watch?v=GpSiMh4_ei8",
        tidal: "https://tidal.com/track/576090941",
        amazonMusic:
          "https://music.amazon.com/albums/B0HQG16688?trackAsin=B0HQFB2Q1L",
        spotify: "",
      },
    },
    {
      numeral: "III",
      title: "Keep the Time",
      released: "01/11/2026",
      links: {
        appleMusic:
          "https://music.apple.com/fr/album/keep-the-time/6829503929?i=6829503930",
        deezer: "",
        youtube: "https://www.youtube.com/watch?v=ez_icen0D1k",
        tidal: "https://tidal.com/track/575119028",
        amazonMusic:
          "https://music.amazon.com/albums/B0HQ1M7NZG?trackAsin=B0HQ19NKNN",
        spotify: "",
      },
    },
  ],
} as const satisfies { title: string; tracks: readonly ReleaseTrack[] };

export const artistLinks = [
  {
    label: "Apple Music",
    href: "https://music.apple.com/fr/artist/lyxaa/6805384271",
  },
  {
    label: "Deezer",
    href: "https://www.deezer.com/artist/427469121",
  },
] as const;
