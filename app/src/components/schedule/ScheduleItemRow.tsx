import { Check, Info } from 'lucide-react';
import { DueStatusBadge } from '../shared/Badge';
import type { ScheduleItemWithStatus } from '../../hooks/useSchedule';

interface ScheduleItemRowProps {
  item: ScheduleItemWithStatus;
  onToggle: (id: string) => void;
}

export function ScheduleItemRow({ item, onToggle }: ScheduleItemRowProps) {
  const isCompleted = item.dueStatus === 'completed';
  const isSkipped = item.dueStatus === 'skipped';

  return (
    <div
      className={`flex items-center gap-3 rounded-md px-3 py-2 ${
        isSkipped ? 'opacity-50' : 'hover:bg-gray-50'
      }`}
    >
      <button
        onClick={() => !isSkipped && onToggle(item.id)}
        disabled={isSkipped}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
          isCompleted
            ? 'border-green-500 bg-green-500 text-white'
            : isSkipped
              ? 'cursor-not-allowed border-gray-300 bg-gray-100'
              : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        {isCompleted && <Check size={14} />}
      </button>
      <div className="min-w-0 flex-1">
        <span
          className={`text-sm ${
            isCompleted
              ? 'text-gray-400 line-through'
              : isSkipped
                ? 'text-gray-400 line-through'
                : 'text-gray-800'
          }`}
        >
          {item.task}
        </span>
        {item.notes && (
          <span className="ml-2 inline-flex items-center gap-0.5 text-xs text-gray-400">
            <Info size={10} />
            {item.notes}
          </span>
        )}
        {item.skipReason && (
          <span className="ml-2 text-xs text-gray-400">
            ({item.skipReason})
          </span>
        )}
      </div>
      <DueStatusBadge status={item.dueStatus} />
    </div>
  );
}
