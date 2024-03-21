export const formatSentence = (text: string) => {
  if (!text) return ".";
  let result = text[0].toUpperCase() + text.slice(1);
  if (!result.endsWith(".")) {
    result += ".";
  }
  return result;
};
