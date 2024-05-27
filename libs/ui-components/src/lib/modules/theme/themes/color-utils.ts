import { css, CSSResult, unsafeCSS } from 'lit';

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF']
export const rainbowColorsInterpolate = interpolateColorArray(rainbowColors, rainbowColors.length)
export const rainbowRandomColors = shuffleArray(['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'])
export const rainbowRandomColorsInterpolate = interpolateColorArray(rainbowRandomColors, rainbowColors.length)

function hexToRgb(hex: string) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function interpolate(start: number, end: number, fraction: number) {
  return Math.round(start + (end - start) * fraction);
}

function interpolateColors(color1: string, color2: string, steps: number) {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const colors = [];

  for (let i = 0; i <= steps; i++) {
    const fraction = i / steps;
    const r = interpolate(r1, r2, fraction);
    const g = interpolate(g1, g2, fraction);
    const b = interpolate(b1, b2, fraction);
    colors.push(rgbToHex(r, g, b));
  }

  return colors;
}

function interpolateColorArray(colors: string[], steps: number) {
  const result = [];

  for (let i = 0; i < colors.length - 1; i++) {
    const interpolatedColors = interpolateColors(colors[i], colors[i + 1], steps);
    result.push(...interpolatedColors.slice(0, -1));
  }
  result.push(colors[colors.length - 1]);

  return result;
}

export function hexToRGBA(hex: string, alfa = 100): CSSResult {
  const [ r, g, b ] = hexToRgb(hex)
  return unsafeCSS(`rgba(${r}, ${g}, ${b}, ${alfa}%)`);
}

export function transformColor(hex: string): CSSResult {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  const deltaR = -32;
  const deltaG = -32;
  const deltaB = -32;

  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  r = clamp(r + deltaR);
  g = clamp(g + deltaG);
  b = clamp(b + deltaB);

  return unsafeCSS(rgbToHex(r, g ,b))
}

export function getRandomBrightColor() {
  const max = 200;
  const min = 32;

  const colors = [
    Math.floor(Math.random() * (max - min) + min),
    Math.floor(Math.random() * (max - min) + min),
    max
  ];

  colors.sort(() => Math.random() - 0.5);

  return rgbToHex(colors[0], colors[1], colors[2]);
}

export function getColorFromString(str: string): string {
  function hashString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function intToRgb(hash: number) {
    const max = 200;
    const min = 32;

    const r = (hash & 0xFF) % (max - min) + min;
    const g = ((hash >> 8) & 0xFF) % (max - min) + min;
    const b = ((hash >> 16) & 0xFF) % (max - min) + min;

    return { r, g, b };
  }

  const hash = hashString(str);
  const { r, g, b } = intToRgb(hash);

  return rgbToHex(r, g, b);
}

export function makeColorSchema(primaryColor: string) {
  return css`
      :root {
          --primary: ${unsafeCSS(primaryColor)};
          --primary-50: ${hexToRGBA(primaryColor, 50)};
          --primary-hover: ${transformColor(primaryColor)};
          --secondary: ${unsafeCSS(primaryColor)}1f;
          --secondary-hover: ${unsafeCSS(primaryColor)}3d;
      }
  `
}
