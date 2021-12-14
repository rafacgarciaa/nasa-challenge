export function toTitleCase(str: string): string {
  return str.replace(/(^|\s)\S/g, t => t.toUpperCase());
}