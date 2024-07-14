export function calculateReadingTime(words: number): string {
  const wordsPerMinute = 250;
  const estimatedTimeMinutes = words / wordsPerMinute;

  const roundedReadingTime = Math.round(estimatedTimeMinutes);
  return `${roundedReadingTime} min`;
}