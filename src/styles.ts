export const styleEm = (valueInPx: number): string => {
  return `${valueInPx / 16}em`;
};

export const styleRem = (valueInPx: number): string => {
  return `${valueInPx / 16}rem`;
};

export const StyleHelpers = {
  em: styleEm,
  rem: styleRem,
};

const Styles = {
  helper: StyleHelpers,
};

export default Styles;
