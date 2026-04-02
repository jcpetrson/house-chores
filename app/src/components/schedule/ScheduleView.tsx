import { AlertTriangle, Clock } from 'lucide-react';
import type { Season } from '../../types/common';
import { getMonthName, getSeasonLabel } from '../../lib/date-utils';
import { CadenceSection } from './CadenceSection';
import type { useSchedule } from '../../hooks/useSchedule';

type ScheduleData = ReturnType<typeof useSchedule>;

interface ScheduleViewProps {
  schedule: ScheduleData;
}

export function ScheduleView({ schedule }: ScheduleViewProps) {
  const { groups, dueCount, overdueCount, toggleComplete, currentQuarter } =
    schedule;
  const now = new Date();

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {getMonthName(now)} {now.getFullYear()} &mdash;{' '}
          {currentQuarter} {getSeasonLabel(currentQuarter as Season)}
        </h2>
        <div className="mt-2 flex gap-4">
          {dueCount > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-amber-600">
              <Clock size={14} />
              {dueCount} item{dueCount !== 1 ? 's' : ''} due
            </div>
          )}
          {overdueCount > 0 && (
            <div className="flex items-center gap-1.5 text-sm text-red-600">
              <AlertTriangle size={14} />
              {overdueCount} overdue
            </div>
          )}
          {dueCount === 0 && overdueCount === 0 && (
            <div className="text-sm text-green-600">All caught up!</div>
          )}
        </div>
      </div>

      {groups.map((group) => {
        const isCurrent =
          group.cadence === 'monthly' ||
          group.season === currentQuarter ||
          group.cadence === 'annual';
        return (
          <CadenceSection
            key={group.label}
            label={group.label}
            items={group.items}
            completedCount={group.completedCount}
            totalCount={group.totalCount}
            defaultExpanded={isCurrent}
            onToggle={toggleComplete}
          />
        );
      })}
    </div>
  );
}
