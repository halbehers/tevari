import chroma, { Color } from "chroma-js";

/**
 * Converts the given number of pixel into Em values and format it into a string.
 *
 * @param valueInPx The value in pixel to convert.
 * @returns the string representation of the equivalent in Em of the given pixel amount.
 */
export const styleEm = (valueInPx: number): string => {
  return `${valueInPx / 16}em`;
};

/**
 * Converts the given number of pixel into Rem values and format it into a string.
 *
 * @param valueInPx The value in pixel to convert.
 * @returns the string representation of the equivalent in Rem of the given pixel amount.
 */
export const styleRem = (valueInPx: number): string => {
  return `${valueInPx / 16}rem`;
};

/**
 * This function calculates if the specified color is "dark", which usually means
 * you need light text if you use it as a background color to fulfill WCAG contrast
 * requirement.
 * The color must be specified via its red, green and blue value in the range of
 * 0 to 255.
 * The formula is based on this Stackoverflow answer: https://stackoverflow.com/a/3943023
 * which itself is based upon the WCAG recommendation for color contrast.
 *
 * @param {number} red The red component in the range 0 to 255
 * @param {number} green The green component in the range 0 to 255
 * @param {number} blue The blue component in the range 0 to 255
 * @returns {boolean} True if the color is dark, false otherwise.
 */
export function styleIsColorDark(red: number, green: number, blue: number): boolean {
  const [r, g, b] = [red, green, blue]
    .map((c) => c / 255.0)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance <= 0.179;
}
/**
 * Checks whether the given value is a valid hexadecimal color.
 *
 * @param hex The value to test.
 * @returns `true` if the value is a valid hexadecimal color, `false`otherwise.
 */
export function styleIsValidHex(hex: string): boolean {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

/**
 * Makes a color more transparent.
 *
 * @param color - Color to manipulate
 * @param alpha - alpha channel value. From 0-1.
 */
export const styleTransparentize = (color: string, alpha: number) => chroma(color).alpha(alpha).css();

const inOriginalFormat = (originalColor: string, newColor: Color) => {
  return styleIsValidHex(originalColor) ? newColor.hex() : newColor.css();
};

/**
 * Mixes a provided color with white.
 *
 * @param color - Color to mix with white
 * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
 */
export const styleTint = (color: string, ratio: number) => {
  const tint = chroma.mix(color, "#fff", ratio, "rgb");
  return inOriginalFormat(color, tint);
};

/**
 * Mixes a provided color with black.
 *
 * @param color - Color to mix with black
 * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
 */
export const styleShade = (color: string, ratio: number) => {
  const shade = chroma.mix(color, "#000", ratio, "rgb");
  return inOriginalFormat(color, shade);
};

/**
 * Increases the saturation of a color by manipulating the hsl saturation.
 *
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const styleSaturate = (color: string, amount: number) => {
  const saturate = chroma(color).set("hsl.s", `+${amount}`);
  return inOriginalFormat(color, saturate);
};

/**
 * Decreases the saturation of a color by manipulating the hsl saturation.
 *
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const styleDesaturate = (color: string, amount: number) => {
  const desaturate = chroma(color).set("hsl.s", `-${amount}`);
  return inOriginalFormat(color, desaturate);
};

/**
 * Returns the lightness value of a color. 0-100
 *
 * @param color
 */
export const styleLightness = (color: string) => chroma(color).get("hsl.l") * 100;

/**
 * Returns the darken value of a color. 0-100
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const styleDarken = (color: string, amount: number) => chroma(color).darken(amount).hex();

/**
 * Returns the brighten value of a color. 0-100
 *
 * @param color - Color to manipulate
 * @param amount - Amount to change in absolute terms. 0-1.
 */
export const styleBrighten = (color: string, amount: number) => chroma(color).brighten(amount).hex();

const asHex = (value: string): string => {
  const hex = parseInt(value, 10).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Converts a RGB color into a hexadecimal color.
 *
 * @param rgb The value to convert.
 * @returns the result.
 */
export const styleRgbToHex = (rgb: string): string => {
  const withoutWhitespace = rgb.replace(/\s+/g, "");
  const rgbMatch = withoutWhitespace.match(/^rgba?\((\d+),(\d+),(\d+)(?:,(?:1(?:\.0*)?|0(?:\.\d+)?))?\)$/i);
  if (!rgbMatch) {
    return "";
  }

  const [, r, g, b] = rgbMatch;

  return `#${asHex(r)}${asHex(g)}${asHex(b)}`;
};

export type rgbDef = [number, number, number];

export interface HSV {
  h: number;
  s: number;
  v: number;
}
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type HEX = string;

/**
 * Converts a RGB color into a HSV color.
 *
 * @param rgb The value to convert.
 * @returns the result.
 */
export function styleRgbToHsv({ r, g, b }: RGB): HSV {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue;
  const value = max;
  const saturation = max === 0 ? 0 : delta / max;
  switch (max) {
    case min:
    default:
      hue = 0;
      break;
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    case b:
      hue = (r - g) / delta + 4;
      break;
  }
  return {
    h: hue * 60,
    s: saturation,
    v: value,
  };
}

/**
 * Converts a hexadecimal color into a RGB color.
 *
 * @param hex The value to convert.
 * @returns the result.
 */
export const styleHexToRgb = (hex: string): rgbDef => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (_, r1, g1, b1) => r1 + r1 + g1 + g1 + b1 + b1);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;

  if (result) {
    const [, r, g, b] = result;
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  }

  // fallback to prevent errors
  return [0, 0, 0];
};

/**
 * Converts a hexadecimal color into a HSV color.
 *
 * @param hex The value to convert.
 * @returns the result.
 */
export const styleHexToHsv = (hex: HEX): HSV => {
  const [r, g, b] = styleHexToRgb(hex);
  return styleRgbToHsv({ r, g, b });
};

/**
 * Converts a HSV color into a RGB color.
 *
 * @param hex The value to convert.
 * @returns the result.
 */
export const styleHsvToRgb = ({ h, s, v }: HSV): RGB => {
  h /= 60;

  const fn = (n: number) => {
    const k = (n + h) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };

  const r = fn(5);
  const g = fn(3);
  const b = fn(1);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

/**
 * Converts a HSV color into a hexadecimal color.
 *
 * @param hex The value to convert.
 * @returns the result.
 */
export const styleHsvToHex = ({ h, s, v }: HSV): HEX => {
  const { r, g, b } = styleHsvToRgb({ h, s, v });
  return styleRgbToHex(`rgb(${r}, ${g}, ${b})`);
};

/**
 * Calculates the luminance of the given RGB values.
 *
 * @param r The red value.
 * @param g The green value.
 * @param b The blue value.
 * @returns the luminance.
 */
export function styleCalculateLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates the contract between the 2 given RGB values.
 *
 * @param rgb1 The first value.
 * @param rgb2 The second value.
 * @returns the contrast.
 */
export function styleCalculateContrast(rgb1: rgbDef, rgb2: rgbDef): number {
  let contrast =
    (styleCalculateLuminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05) /
    (styleCalculateLuminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05);

  if (contrast < 1) {
    contrast = 1 / contrast;
  }
  return contrast;
}

export const StyleHelpers = {
  /**
   * Converts the given number of pixel into Em values and format it into a string.
   *
   * @param valueInPx The value in pixel to convert.
   * @returns the string representation of the equivalent in Em of the given pixel amount.
   */
  em: styleEm,
  /**
   * Converts the given number of pixel into Rem values and format it into a string.
   *
   * @param valueInPx The value in pixel to convert.
   * @returns the string representation of the equivalent in Rem of the given pixel amount.
   */
  rem: styleRem,
  /**
   * This function calculates if the specified color is "dark", which usually means
   * you need light text if you use it as a background color to fulfill WCAG contrast
   * requirement.
   * The color must be specified via its red, green and blue value in the range of
   * 0 to 255.
   * The formula is based on this Stackoverflow answer: https://stackoverflow.com/a/3943023
   * which itself is based upon the WCAG recommendation for color contrast.
   *
   * @param {number} red The red component in the range 0 to 255
   * @param {number} green The green component in the range 0 to 255
   * @param {number} blue The blue component in the range 0 to 255
   * @returns {boolean} True if the color is dark, false otherwise.
   */
  isColorDark: styleIsColorDark,
  /**
   * Checks whether the given value is a valid hexadecimal color.
   *
   * @param hex The value to test.
   * @returns `true` if the value is a valid hexadecimal color, `false`otherwise.
   */
  isValidHex: styleIsValidHex,
  /**
   * Makes a color more transparent.
   *
   * @param color - Color to manipulate
   * @param alpha - alpha channel value. From 0-1.
   */
  transparentize: styleTransparentize,
  /**
   * Mixes a provided color with white.
   *
   * @param color - Color to mix with white
   * @param ratio - Mix weight. From 0-1. Larger value indicates more white.
   */
  tint: styleTint,
  /**
   * Mixes a provided color with black.
   *
   * @param color - Color to mix with black
   * @param ratio - Mix weight. From 0-1. Larger value indicates more black.
   */
  shade: styleShade,
  /**
   * Increases the saturation of a color by manipulating the hsl saturation.
   *
   * @param color - Color to manipulate
   * @param amount - Amount to change in absolute terms. 0-1.
   */
  saturate: styleSaturate,
  /**
   * Decreases the saturation of a color by manipulating the hsl saturation.
   *
   * @param color - Color to manipulate
   * @param amount - Amount to change in absolute terms. 0-1.
   */
  desaturate: styleDesaturate,
  /**
   * Returns the lightness value of a color. 0-100
   *
   * @param color
   */
  lightness: styleLightness,
  /**
   * Returns the darken value of a color. 0-100
   * @param color - Color to manipulate
   * @param amount - Amount to change in absolute terms. 0-1.
   */
  darken: styleDarken,
  /**
   * Returns the brighten value of a color. 0-100
   *
   * @param color - Color to manipulate
   * @param amount - Amount to change in absolute terms. 0-1.
   */
  brighten: styleBrighten,
  /**
   * Converts a RGB color into a hexadecimal color.
   *
   * @param rgb The value to convert.
   * @returns the result.
   */
  rgbToHex: styleRgbToHex,
  /**
   * Converts a RGB color into a HSV color.
   *
   * @param rgb The value to convert.
   * @returns the result.
   */
  rgbToHsv: styleRgbToHsv,
  /**
   * Converts a hexadecimal color into a RGB color.
   *
   * @param hex The value to convert.
   * @returns the result.
   */
  hexToRgb: styleHexToRgb,
  /**
   * Converts a hexadecimal color into a HSV color.
   *
   * @param hex The value to convert.
   * @returns the result.
   */
  hexToHsv: styleHexToHsv,
  /**
   * Converts a HSV color into a RGB color.
   *
   * @param hex The value to convert.
   * @returns the result.
   */
  hsvToRgb: styleHsvToRgb,
  /**
   * Converts a HSV color into a hexadecimal color.
   *
   * @param hex The value to convert.
   * @returns the result.
   */
  hsvToHex: styleHsvToHex,
  /**
   * Calculates the luminance of the given RGB values.
   *
   * @param r The red value.
   * @param g The green value.
   * @param b The blue value.
   * @returns the luminance.
   */
  calculateLuminance: styleCalculateLuminance,
  /**
   * Calculates the contract between the 2 given RGB values.
   *
   * @param rgb1 The first value.
   * @param rgb2 The second value.
   * @returns the contrast.
   */
  calculateContrast: styleCalculateContrast,
};

export const Styles = {
  /**
   * Style helper methods.
   */
  helper: StyleHelpers,
};
