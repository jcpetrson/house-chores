import type { DueStatus, Urgency } from '../../types/common';

const DUE_STYLES: Record<DueStatus, string> = {
  due: 'bg-amber-100 text-amber-800',
  overdue: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
  upcoming: 'bg-gray-100 text-gray-500',
  skipped: 'bg-gray-100 text-gray-400 line-through',
};

const URGENCY_STYLES: Record<Urgency, string> = {
  routine: 'bg-blue-100 text-blue-700',
  soon: 'bg-amber-100 text-amber-700',
  urgent: 'bg-red-100 text-red-700',
};


export function DueStatusBadge({ status }: { status: DueStatus }) {
  const label =
    status === 'due'
      ? 'Due'
      : status === 'overdue'
        ? 'Overdue'
        : status === 'completed'
          ? 'Done'
          : status === 'skipped'
            ? 'N/A'
            : '';
  if (!label) return null;
  return <span className={`${DUE_STYLES[status]} rounded px-1.5 py-0.5 text-xs font-medium`}>{label}</span>;
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  return (
    <span className={`${URGENCY_STYLES[urgency]} rounded px-1.5 py-0.5 text-xs font-medium`}>
      {urgency}
    </span>
  );
}

