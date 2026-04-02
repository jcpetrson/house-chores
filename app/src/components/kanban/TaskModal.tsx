import { useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import type { KanbanTask } from '../../types/kanban';
import type { Urgency } from '../../types/common';
import { Modal } from '../shared/Modal';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Omit<KanbanTask, 'id' | 'createdAt' | 'sortOrder'>) => void;
  onDelete?: (id: string) => void;
  task?: KanbanTask;
}

export function TaskModal({
  open,
  onClose,
  onSave,
  onDelete,
  task,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [urgency, setUrgency] = useState<Urgency>(task?.urgency ?? 'routine');
  const [category, setCategory] = useState(task?.category ?? '');
  const [location, setLocation] = useState(task?.location ?? '');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isEdit = !!task;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      status: task?.status ?? 'backlog',
      urgency,
      category: category.trim(),
      location: location.trim(),
      completedAt: task?.completedAt,
    });
    onClose();
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Edit Task' : 'New Task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            autoFocus
          />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            className={inputClass}
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details, notes, context..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Category</label>
            <input
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. HVAC, Plumbing"
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Basement, Exterior"
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Urgency</label>
          <select
            className={inputClass}
            value={urgency}
            onChange={(e) => setUrgency(e.target.value as Urgency)}
          >
            <option value="routine">Routine</option>
            <option value="soon">Soon</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          {isEdit && onDelete ? (
            confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-red-600">Delete this task?</span>
                <button
                  type="button"
                  onClick={() => {
                    onDelete(task.id);
                    onClose();
                  }}
                  className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 hover:bg-gray-300"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-600"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
            >
              {isEdit ? 'Save' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
