import { useCallback, useMemo } from 'react';
import type { ScheduleItem } from '../types/schedule';
import type { Cadence, Season, DueStatus } from '../types/common';
import { getDueStatus, getCurrentQuarter } from '../lib/date-utils';
import type { AppState } from '../lib/storage';

export interface ScheduleItemWithStatus extends ScheduleItem {
  dueStatus: DueStatus;
}

interface ScheduleGroup {
  label: string;
  cadence: Cadence;
  season?: Season;
  items: ScheduleItemWithStatus[];
  completedCount: number;
  totalCount: number;
}

interface UseScheduleProps {
  state: AppState;
  updateState: (updater: (prev: AppState) => AppState) => void;
}

export function useSchedule({ state, updateState }: UseScheduleProps) {
  const now = useMemo(() => new Date(), []);
  const currentQuarter = getCurrentQuarter(now);

  const itemsWithStatus: ScheduleItemWithStatus[] = useMemo(
    () =>
      state.scheduleItems.map((item) => ({
        ...item,
        dueStatus: getDueStatus(item, now),
      })),
    [state.scheduleItems, now],
  );

  const groups: ScheduleGroup[] = useMemo(() => {
    const monthly = itemsWithStatus.filter((i) => i.cadence === 'monthly');
    const annual = itemsWithStatus.filter((i) => i.cadence === 'annual');

    const quarters: Season[] = ['Q1', 'Q2', 'Q3', 'Q4'];
    const seasonLabels: Record<Season, string> = {
      Q1: 'Q1 \u2014 Winter (Jan\u2013Mar)',
      Q2: 'Q2 \u2014 Spring (Apr\u2013Jun)',
      Q3: 'Q3 \u2014 Summer (Jul\u2013Sep)',
      Q4: 'Q4 \u2014 Fall (Oct\u2013Dec)',
    };

    const quarterGroups = quarters.map((q) => {
      const items = itemsWithStatus.filter(
        (i) => i.cadence === 'quarterly' && i.season === q,
      );
      return buildGroup(seasonLabels[q], 'quarterly', items, q);
    });

    const currentIdx = quarters.indexOf(currentQuarter);
    const reordered = [
      ...quarterGroups.slice(currentIdx),
      ...quarterGroups.slice(0, currentIdx),
    ];

    return [
      buildGroup('Monthly', 'monthly', monthly),
      ...reordered,
      buildGroup('Annual', 'annual', annual),
    ];
  }, [itemsWithStatus, currentQuarter]);

  const dueCount = itemsWithStatus.filter((i) => i.dueStatus === 'due').length;
  const overdueCount = itemsWithStatus.filter(
    (i) => i.dueStatus === 'overdue',
  ).length;

  const toggleComplete = useCallback(
    (itemId: string) => {
      updateState((prev) => ({
        ...prev,
        scheduleItems: prev.scheduleItems.map((item) => {
          if (item.id !== itemId) return item;
          const isCompleted = item.lastCompleted
            ? getDueStatus(item, new Date()).toString() === 'completed'
            : false;
          return {
            ...item,
            lastCompleted: isCompleted ? undefined : new Date().toISOString(),
          };
        }),
      }));
    },
    [updateState],
  );

  return { groups, dueCount, overdueCount, toggleComplete, currentQuarter };
}

function buildGroup(
  label: string,
  cadence: Cadence,
  items: ScheduleItemWithStatus[],
  season?: Season,
): ScheduleGroup {
  const active = items.filter((i) => !i.skipped);
  return {
    label,
    cadence,
    season,
    items,
    completedCount: active.filter((i) => i.dueStatus === 'completed').length,
    totalCount: active.length,
  };
}
