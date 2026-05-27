const controlCharacters = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const htmlSpecialCharacters = /[<>&"'`]/g;

const htmlEntityMap: Record<string, string> = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

export function sanitizeInput(value: string) {
  return value
    .replace(controlCharacters, '')
    .replace(htmlSpecialCharacters, (character) => htmlEntityMap[character] ?? character)
    .replace(/\s+/g, ' ')
    .trim();
}

