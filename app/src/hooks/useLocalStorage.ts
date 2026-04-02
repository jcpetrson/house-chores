import { useState, useCallback } from 'react';
import { loadState, saveState, type AppState } from '../lib/storage';

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState);

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  return { state, updateState };
}
