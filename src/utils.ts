export function makeHumanReadable(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\W_]/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}
