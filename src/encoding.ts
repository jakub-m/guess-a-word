// From https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings

export const encodeB64 = (string_: string): string => {
  const codeUnits = new Uint16Array(string_.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string_.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
};

export const decodeB64 = (encoded: string): string => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
};
