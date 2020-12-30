type FontSize = "xl" | "l" | "m";
type FontWeight = "bold" | "regular";

export const textStyle = (option: {
  size: FontSize;
  weight: FontWeight;
}): string => {
  const size: { [key in FontSize]: number } = {
    xl: 32,
    l: 24,
    m: 14,
  };

  return `
    font-size: ${size[option.size]}px;
    font-weight: ${option.weight};
  `;
};
