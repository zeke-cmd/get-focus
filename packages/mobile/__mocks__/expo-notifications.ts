export function getPermissionsAsync() { return Promise.resolve({ status: 'undetermined' }); }
export function requestPermissionsAsync() { return Promise.resolve({ status: 'granted' }); }
export function scheduleNotificationAsync() { return Promise.resolve('mock-id'); }
export function cancelAllScheduledNotificationsAsync() { return Promise.resolve(); }
export function setNotificationHandler() {}
