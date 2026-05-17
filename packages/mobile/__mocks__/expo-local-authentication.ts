export const AuthenticationType = { FINGERPRINT: 1, FACIAL_RECOGNITION: 2, IRIS: 3 };
export function hasHardwareAsync() { return Promise.resolve(false); }
export function isEnrolledAsync() { return Promise.resolve(false); }
export function authenticateAsync() { return Promise.resolve({ success: false }); }
export function supportedAuthenticationTypesAsync() { return Promise.resolve([]); }
