import { Columns3, CalendarCheck } from 'lucide-react';

export type View = 'board' | 'schedule';

interface NavBarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export function NavBar({ activeView, onViewChange }: NavBarProps) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900">HomeBase</h1>
        <nav className="flex gap-1 rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => onViewChange('board')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeView === 'board'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Columns3 size={16} />
            Board
          </button>
          <button
            onClick={() => onViewChange('schedule')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeView === 'schedule'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CalendarCheck size={16} />
            Schedule
          </button>
        </nav>
      </div>
    </header>
  );
}
