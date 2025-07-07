/**
 * Utility functions for persisting Redux state to localStorage
 */

const STORAGE_KEY = "desktop-toolbox-state";

export interface PersistedState {
  heading?: {
    heading?: string;
  };
}

/**
 * Load persisted state from localStorage
 */
export function loadPersistedState(): PersistedState | undefined {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn("Failed to load persisted state:", error);
    return undefined;
  }
}

/**
 * Save state to localStorage
 */
export function savePersistedState(state: PersistedState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.warn("Failed to save persisted state:", error);
  }
}

/**
 * Clear persisted state from localStorage
 */
export function clearPersistedState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Failed to clear persisted state:", error);
  }
}
