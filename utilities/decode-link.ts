/**
 * Decode provided encoded magnet link
 * @param {string} encodedLink - encoded magnet link
 * @returns {null | string}
 */
export default function decodeLink(encodedLink: string): null | string {
  let decoded = '';

  try {
    decoded = atob(encodedLink);
  } catch {
    return null;
  }

  return decoded;
}
