import localFont from "next/font/local";

export const monaSans = localFont({
  src: "../fonts/monasans/MonaSans[wdth,wght].ttf",
  display: "swap",
  variable: "--font-mona",
  weight: "200 900",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const newsreader = localFont({
  src: [
    {
      path: "../fonts/newsreader/Newsreader[opsz,wght].ttf",
      style: "normal",
      weight: "200 800",
    },
    {
      path: "../fonts/newsreader/Newsreader-Italic[opsz,wght].ttf",
      style: "italic",
      weight: "200 800",
    },
  ],
  display: "swap",
  variable: "--font-newsreader",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: false,
});
