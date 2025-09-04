export function validateUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function sanitizeAlias(value) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 64);
}

export function randomCode(len = 6) {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  return Array.from({ length: len }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
