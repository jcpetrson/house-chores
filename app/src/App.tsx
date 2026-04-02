import { useState, useCallback, useMemo } from 'react';
import { NavBar, type View } from './components/layout/NavBar';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { ScheduleView } from './components/schedule/ScheduleView';
import { useAppState } from './hooks/useLocalStorage';
import { useKanbanBoard } from './hooks/useKanbanBoard';
import { useSchedule, type ScheduleItemWithStatus } from './hooks/useSchedule';

export default function App() {
  const [view, setView] = useState<View>('board');
  const { state, updateState } = useAppState();
  const kanban = useKanbanBoard({ state, updateState });
  const schedule = useSchedule({ state, updateState });

  const boardTaskScheduleIds = useMemo(
    () => new Set(state.tasks.map((t) => t.scheduleItemId).filter(Boolean) as string[]),
    [state.tasks],
  );

  const handleSendToBoard = useCallback(
    (item: ScheduleItemWithStatus) => {
      kanban.addTask({
        title: item.task,
        description: item.notes ?? '',
        status: 'backlog',
        urgency: item.dueStatus === 'overdue' ? 'soon' : 'routine',
        category: '',
        location: '',
        completedAt: undefined,
        scheduleItemId: item.id,
      });
    },
    [kanban],
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <NavBar activeView={view} onViewChange={setView} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {view === 'board' ? (
          <KanbanBoard
            tasksByColumn={kanban.tasksByColumn}
            onAddTask={kanban.addTask}
            onUpdateTask={kanban.updateTask}
            onDeleteTask={kanban.deleteTask}
            onMoveTask={kanban.moveTask}
          />
        ) : (
          <ScheduleView
            schedule={schedule}
            onSendToBoard={handleSendToBoard}
            boardTaskScheduleIds={boardTaskScheduleIds}
          />
        )}
      </main>
    </div>
  );
}
