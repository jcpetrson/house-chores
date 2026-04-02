import type { Season, DueStatus } from '../types/common';
import type { ScheduleItem } from '../types/schedule';

export function getCurrentQuarter(date: Date): Season {
  const month = date.getMonth();
  if (month <= 2) return 'Q1';
  if (month <= 5) return 'Q2';
  if (month <= 8) return 'Q3';
  return 'Q4';
}

export function getQuarterIndex(season: Season): number {
  return parseInt(season[1]);
}

function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function isInQuarter(date: Date, year: number, season: Season): boolean {
  if (date.getFullYear() !== year) return false;
  const q = getCurrentQuarter(date);
  return q === season;
}

function isSameYear(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear();
}

export function getDueStatus(item: ScheduleItem, now: Date): DueStatus {
  if (item.skipped) return 'skipped';

  const lastDone = item.lastCompleted ? new Date(item.lastCompleted) : null;

  if (item.cadence === 'monthly') {
    if (lastDone && isSameMonth(lastDone, now)) return 'completed';
    if (lastDone) {
      const monthsSince =
        (now.getFullYear() - lastDone.getFullYear()) * 12 +
        (now.getMonth() - lastDone.getMonth());
      if (monthsSince >= 2) return 'overdue';
    }
    return 'due';
  }

  if (item.cadence === 'quarterly' && item.season) {
    const currentQ = getCurrentQuarter(now);
    const currentQIdx = getQuarterIndex(currentQ);
    const itemQIdx = getQuarterIndex(item.season);

    if (lastDone && isInQuarter(lastDone, now.getFullYear(), item.season)) {
      return 'completed';
    }

    if (item.season === currentQ) return 'due';
    if (itemQIdx < currentQIdx) return 'overdue';
    return 'upcoming';
  }

  if (item.cadence === 'annual') {
    if (lastDone && isSameYear(lastDone, now)) return 'completed';
    const currentQIdx = getQuarterIndex(getCurrentQuarter(now));
    if (currentQIdx >= 3) return 'overdue';
    return 'due';
  }

  return 'due';
}

export function getSeasonLabel(season: Season): string {
  const labels: Record<Season, string> = {
    Q1: 'Winter',
    Q2: 'Spring',
    Q3: 'Summer',
    Q4: 'Fall',
  };
  return labels[season];
}

export function getMonthName(date: Date): string {
  return date.toLocaleString('default', { month: 'long' });
}
