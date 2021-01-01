type FontSize = "xl" | "l" | "m";
type FontWeight = "bold" | "regular";

export const textStyle = (option: {
  size: FontSize;
  weight: FontWeight;
}): string => {
  const size: { [key in FontSize]: number } = {
    xl: 36,
    l: 28,
    m: 14,
  };

  const weight: { [key in FontWeight]: number } = {
    bold: 700,
    regular: 404,
  };

  return `
    font-size: ${size[option.size]}px;
    font-weight: ${weight[option.weight]};
  `;
};
