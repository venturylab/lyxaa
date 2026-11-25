/** The only place the stage name is written. See docs/RENAME.md. */
export const artistName = "LYXAA";

const brand = "/brand";

/** Off until photographs from a real shoot are published. */
export const showLightLine = false;

export const wordmarks = {
  fenduOnDark: `${brand}/${artistName}-wordmark-fendu-blanc.svg`,
  fenduOnLight: `${brand}/${artistName}-wordmark-fendu-noir.svg`,
  smallOnDark: `${brand}/${artistName}-wordmark-plein-petites-tailles-blanc.svg`,
  smallOnLight: `${brand}/${artistName}-wordmark-plein-petites-tailles-noir.svg`,
} as const;
