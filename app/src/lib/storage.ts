import type { KanbanTask } from '../types/kanban';
import type { ScheduleItem } from '../types/schedule';
import { SEED_TASKS } from '../data/seed-tasks';
import { SEED_SCHEDULE } from '../data/seed-schedule';

const STORAGE_KEY = 'homebase-state';
const CURRENT_VERSION = 1;

export interface AppState {
  version: number;
  tasks: KanbanTask[];
  scheduleItems: ScheduleItem[];
}

function createInitialState(): AppState {
  return {
    version: CURRENT_VERSION,
    tasks: [...SEED_TASKS],
    scheduleItems: SEED_SCHEDULE.map((item) => ({ ...item })),
  };
}

export function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = createInitialState();
    saveState(initial);
    return initial;
  }
  return JSON.parse(raw) as AppState;
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
