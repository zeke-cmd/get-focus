let counter = 0;

export function randomUUID(): string {
  counter++;
  return `test-uuid-${counter.toString().padStart(4, '0')}`;
}

export const CryptoDigestAlgorithm = {
  SHA256: 'SHA-256',
  SHA384: 'SHA-384',
  SHA512: 'SHA-512',
  MD5: 'MD5',
};

export async function digestStringAsync(
  algorithm: string,
  data: string
): Promise<string> {
  // Simple deterministic hash mock: just return a hex-like string based on input
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}
