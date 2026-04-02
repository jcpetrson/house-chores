import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { KanbanTask } from '../../types/kanban';
import type { KanbanStatus } from '../../types/common';
import { KanbanCard } from './KanbanCard';

const COLUMN_COLORS: Record<KanbanStatus, string> = {
  backlog: 'bg-gray-50 border-gray-200',
  'up-next': 'bg-blue-50 border-blue-200',
  'in-progress': 'bg-amber-50 border-amber-200',
  done: 'bg-green-50 border-green-200',
};

const HEADER_DOTS: Record<KanbanStatus, string> = {
  backlog: 'bg-gray-400',
  'up-next': 'bg-blue-400',
  'in-progress': 'bg-amber-400',
  done: 'bg-green-400',
};

interface KanbanColumnProps {
  status: KanbanStatus;
  label: string;
  tasks: KanbanTask[];
  onAddTask?: () => void;
  onEditTask: (task: KanbanTask) => void;
}

export function KanbanColumn({
  status,
  label,
  tasks,
  onAddTask,
  onEditTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div
      className={`flex flex-col rounded-lg border ${COLUMN_COLORS[status]} ${
        isOver ? 'ring-2 ring-blue-300' : ''
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${HEADER_DOTS[status]}`} />
          <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
          <span className="rounded-full bg-white px-1.5 py-0.5 text-xs text-gray-500 shadow-sm">
            {tasks.length}
          </span>
        </div>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="rounded p-1 text-gray-400 hover:bg-white hover:text-gray-600"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
      <div
        ref={setNodeRef}
        className="flex min-h-[120px] flex-1 flex-col gap-2 px-2 pb-2"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-xs text-gray-400">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
