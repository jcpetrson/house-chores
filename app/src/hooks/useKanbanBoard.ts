import { useCallback, useMemo } from 'react';
import type { KanbanTask } from '../types/kanban';
import type { KanbanStatus } from '../types/common';
import type { AppState } from '../lib/storage';

interface UseKanbanBoardProps {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
}

export function useKanbanBoard({ state, updateState }: UseKanbanBoardProps) {
  const tasks = state.tasks;

  const tasksByColumn = useMemo(() => {
    const grouped: Record<KanbanStatus, KanbanTask[]> = {
      backlog: [],
      'up-next': [],
      'in-progress': [],
      done: [],
    };
    for (const task of tasks) {
      grouped[task.status].push(task);
    }
    for (const col of Object.values(grouped)) {
      col.sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return grouped;
  }, [tasks]);

  const addTask = useCallback(
    (task: Omit<KanbanTask, 'id' | 'createdAt' | 'sortOrder'>) => {
      updateState((prev) => {
        const maxOrder = prev.tasks
          .filter((t) => t.status === task.status)
          .reduce((max, t) => Math.max(max, t.sortOrder), -1);
        const newTask: KanbanTask = {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          sortOrder: maxOrder + 1,
        };
        return { ...prev, tasks: [...prev.tasks, newTask] };
      });
    },
    [updateState],
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<KanbanTask>) => {
      updateState((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      }));
    },
    [updateState],
  );

  const deleteTask = useCallback(
    (id: string) => {
      updateState((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== id),
      }));
    },
    [updateState],
  );

  const moveTask = useCallback(
    (taskId: string, newStatus: KanbanStatus, newIndex: number) => {
      updateState((prev) => {
        const task = prev.tasks.find((t) => t.id === taskId);
        if (!task) return prev;

        const completedAt =
          newStatus === 'done' ? new Date().toISOString() : undefined;

        const otherInColumn = prev.tasks
          .filter((t) => t.status === newStatus && t.id !== taskId)
          .sort((a, b) => a.sortOrder - b.sortOrder);

        otherInColumn.splice(newIndex, 0, {
          ...task,
          status: newStatus,
          completedAt,
        });

        const reordered = otherInColumn.map((t, i) => ({
          ...t,
          sortOrder: i,
        }));

        const rest = prev.tasks.filter(
          (t) => t.id !== taskId && t.status !== newStatus,
        );

        return { ...prev, tasks: [...rest, ...reordered] };
      });
    },
    [updateState],
  );

  return { tasks, tasksByColumn, addTask, updateTask, deleteTask, moveTask };
}
