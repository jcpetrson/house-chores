import type { KanbanStatus, Urgency, TaskType } from './common';

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: KanbanStatus;
  urgency: Urgency;
  category: string;
  location: string;
  type: TaskType;
  estimatedCost?: number;
  createdAt: string;
  completedAt?: string;
  sortOrder: number;
}
