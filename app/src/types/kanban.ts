import type { KanbanStatus, Urgency } from './common';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  urgency: Urgency;
  category: string;
  location: string;
  estimatedCost?: number;
  createdAt: string;
  completedAt?: string;
  scheduleItemId?: string;
  sortOrder: number;
}
