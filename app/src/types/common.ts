export type Urgency = 'routine' | 'soon' | 'urgent';
export type TaskType = 'DIY' | 'hire-out' | 'TBD';
export type KanbanStatus = 'backlog' | 'up-next' | 'in-progress' | 'done';
export type Cadence = 'monthly' | 'quarterly' | 'annual';
export type Season = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type DueStatus = 'due' | 'overdue' | 'completed' | 'upcoming' | 'skipped';

export const KANBAN_COLUMNS: { status: KanbanStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'up-next', label: 'Up Next' },
  { status: 'in-progress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
];

export const SEASON_LABELS: Record<Season, string> = {
  Q1: 'Winter (Jan\u2013Mar)',
  Q2: 'Spring (Apr\u2013Jun)',
  Q3: 'Summer (Jul\u2013Sep)',
  Q4: 'Fall (Oct\u2013Dec)',
};
