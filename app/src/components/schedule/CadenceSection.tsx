import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ScheduleItemWithStatus } from '../../hooks/useSchedule';
import { ScheduleItemRow } from './ScheduleItemRow';

interface CadenceSectionProps {
  label: string;
  items: ScheduleItemWithStatus[];
  completedCount: number;
  totalCount: number;
  defaultExpanded?: boolean;
  onToggle: (id: string) => void;
}

export function CadenceSection({
  label,
  items,
  completedCount,
  totalCount,
  defaultExpanded = false,
  onToggle,
}: CadenceSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-lg border bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          {expanded ? (
            <ChevronDown size={18} className="text-gray-400" />
          ) : (
            <ChevronRight size={18} className="text-gray-400" />
          )}
          <h3 className="text-sm font-semibold text-gray-800">{label}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            {completedCount}/{totalCount}
          </span>
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{
                width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%',
              }}
            />
          </div>
        </div>
      </button>
      {expanded && (
        <div className="border-t px-1 py-1">
          {items.map((item) => (
            <ScheduleItemRow key={item.id} item={item} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
