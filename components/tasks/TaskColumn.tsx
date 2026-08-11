import TaskCard from "./TaskCard";
import type { Task } from "./TaskBoard";

type TaskColumnProps = {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: Task["status"]
  ) => void;
};

export default function TaskColumn({
  title,
  status,
  tasks,
  onAddTask,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskColumnProps) {
  return (
    <section className="rounded-lg border border-[#e8e8e8] bg-[#f7f7f7] p-3">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-[#171717]">
            {title}
          </h2>

          <span className="rounded-md bg-white px-2 py-1 text-xs text-[#777777]">
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onAddTask(status)}
          className="text-lg text-[#777777] hover:text-[#171717]"
        >
          +
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}

        <button
          type="button"
          onClick={() => onAddTask(status)}
          className="w-full rounded-md py-2 text-sm text-[#777777] hover:bg-white"
        >
          + Add Task
        </button>
      </div>
    </section>
  );
}