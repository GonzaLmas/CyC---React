// cryptoUtils.ts (para React + Vite)

function generateSalt(length = 16): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array)); // base64
}

async function createPasswordHash(
  password: string,
  salt: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function encryptPassword(
  password: string
): Promise<{ hashedPassword: string; salt: string }> {
  const salt = generateSalt();
  const hashedPassword = await createPasswordHash(password, salt);

  return { hashedPassword, salt };
}

export async function encryptPasswordWithSalt(
  password: string,
  salt: string
): Promise<string> {
  return await createPasswordHash(password, salt);
}
