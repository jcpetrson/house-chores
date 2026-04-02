import { useState, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
  rectIntersection,
  type CollisionDetection,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { KanbanTask } from '../../types/kanban';
import type { KanbanStatus } from '../../types/common';
import { KANBAN_COLUMNS } from '../../types/common';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { TaskModal } from './TaskModal';

const COLUMN_IDS = new Set(KANBAN_COLUMNS.map((c) => c.status));

const collisionDetection: CollisionDetection = (args) => {
  // First try pointerWithin — works well when pointer is inside a droppable
  const pointerCollisions = pointerWithin(args);
  if (pointerCollisions.length > 0) return pointerCollisions;
  // Fallback to rect intersection for edge cases
  return rectIntersection(args);
};

interface KanbanBoardProps {
  tasksByColumn: Record<KanbanStatus, KanbanTask[]>;
  onAddTask: (task: Omit<KanbanTask, 'id' | 'createdAt' | 'sortOrder'>) => void;
  onUpdateTask: (id: string, updates: Partial<KanbanTask>) => void;
  onDeleteTask: (id: string) => void;
  onMoveTask: (taskId: string, newStatus: KanbanStatus, newIndex: number) => void;
}

export function KanbanBoard({
  tasksByColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onMoveTask,
}: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<KanbanTask | undefined>();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  function findColumn(taskId: string): KanbanStatus | undefined {
    for (const [status, tasks] of Object.entries(tasksByColumn)) {
      if (tasks.some((t) => t.id === taskId)) return status as KanbanStatus;
    }
    return undefined;
  }

  function resolveColumn(overId: string): KanbanStatus | undefined {
    // If overId is a column ID, return it directly
    if (COLUMN_IDS.has(overId as KanbanStatus)) return overId as KanbanStatus;
    // Otherwise it's a task ID — find which column it's in
    return findColumn(overId);
  }

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = event.active.id as string;
      const col = findColumn(id);
      if (col) {
        const task = tasksByColumn[col].find((t) => t.id === id);
        if (task) setActiveTask(task);
      }
    },
    [tasksByColumn],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;
      const sourceCol = findColumn(activeId);
      const targetCol = resolveColumn(overId);

      if (!sourceCol || !targetCol) return;

      if (sourceCol === targetCol) {
        // Reorder within same column
        const items = tasksByColumn[sourceCol];
        const oldIndex = items.findIndex((t) => t.id === activeId);
        const newIndex = items.findIndex((t) => t.id === overId);
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          const reordered = arrayMove(items, oldIndex, newIndex);
          reordered.forEach((t, i) => {
            onUpdateTask(t.id, { sortOrder: i });
          });
        }
      } else {
        // Move to different column
        const overItems = tasksByColumn[targetCol];
        const overIndex = overItems.findIndex((t) => t.id === overId);
        const insertIndex = overIndex >= 0 ? overIndex : overItems.length;
        onMoveTask(activeId, targetCol, insertIndex);
      }
    },
    [tasksByColumn, onUpdateTask, onMoveTask],
  );

  function openAddModal() {
    setEditingTask(undefined);
    setModalOpen(true);
  }

  function openEditModal(task: KanbanTask) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSave(
    taskData: Omit<KanbanTask, 'id' | 'createdAt' | 'sortOrder'>,
  ) {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KANBAN_COLUMNS.map(({ status, label }) => (
            <KanbanColumn
              key={status}
              status={status}
              label={label}
              tasks={tasksByColumn[status]}
              onAddTask={status === 'backlog' ? openAddModal : undefined}
              onEditTask={openEditModal}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-2 opacity-90">
              <KanbanCard task={activeTask} onEdit={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal
        key={editingTask?.id ?? 'new'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={editingTask ? onDeleteTask : undefined}
        task={editingTask}
      />
    </>
  );
}
