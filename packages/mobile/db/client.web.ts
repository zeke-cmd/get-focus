import React, { createContext, useContext } from 'react';

export type Database = any;
export const db: Database = null;

const DatabaseContext = createContext<Database | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  return React.createElement(DatabaseContext.Provider, { value: db }, children);
}

export function useDatabase(): Database {
  throw new Error('Database not available on web target. Run on a native device via Expo Go.');
}

export function resetAllData(): void {
  throw new Error('Database not available on web target.');
}
