// Mock expo-sqlite for testing
const mockDb = {
  execSync: jest.fn(),
  execAsync: jest.fn(),
  runSync: jest.fn(),
  runAsync: jest.fn(),
  getFirstSync: jest.fn(),
  getFirstAsync: jest.fn(),
  getAllSync: jest.fn(() => []),
  getAllAsync: jest.fn(() => Promise.resolve([])),
};

export function openDatabaseSync() {
  return mockDb;
}

export function openDatabaseAsync() {
  return Promise.resolve(mockDb);
}

export default { openDatabaseSync, openDatabaseAsync };
