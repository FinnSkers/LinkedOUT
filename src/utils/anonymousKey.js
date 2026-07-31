// Zero-friction Anonymous Device Key & Identity Manager
export function getOrCreateDeviceToken() {
  let token = localStorage.getItem('linkedout_device_token');
  if (!token) {
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
    token = `LO-RENEGADE-${randomHex}`;
    localStorage.setItem('linkedout_device_token', token);
  }
  return token;
}

export function saveSecretKey(key) {
  localStorage.setItem('linkedout_device_token', key.trim());
}
