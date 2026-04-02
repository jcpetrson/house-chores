import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MapPin } from 'lucide-react';
import type { KanbanTask } from '../../types/kanban';
import { UrgencyBadge, TaskTypeBadge } from '../shared/Badge';

interface KanbanCardProps {
  task: KanbanTask;
  onEdit: (task: KanbanTask) => void;
}

export function KanbanCard({ task, onEdit }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border bg-white p-3 shadow-sm ${
        isDragging ? 'opacity-50 shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 shrink-0 cursor-grab text-gray-300 hover:text-gray-500 active:cursor-grabbing"
        >
          <GripVertical size={16} />
        </button>
        <div className="min-w-0 flex-1">
          <button
            onClick={() => onEdit(task)}
            className="mb-1 text-left text-sm font-medium text-gray-900 hover:text-blue-600"
          >
            {task.title}
          </button>
          {task.location && (
            <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              {task.location}
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            <UrgencyBadge urgency={task.urgency} />
            <TaskTypeBadge type={task.type} />
          </div>
        </div>
      </div>
    </div>
  );
}
