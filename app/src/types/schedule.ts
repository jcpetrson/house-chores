import type { Cadence, Season } from './common';

export interface ScheduleItem {
  id: string;
  task: string;
  cadence: Cadence;
  season?: Season;
  notes?: string;
  lastCompleted?: string;
  skipped?: boolean;
  skipReason?: string;
}
