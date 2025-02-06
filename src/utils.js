export const pickPalette = (name, colorPalette) => {
  const index = name.charCodeAt(0) % colorPalette.length;
  return colorPalette[index];
};
