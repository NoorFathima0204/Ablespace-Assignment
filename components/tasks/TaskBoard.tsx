"use client";

import TaskColumn from "./TaskColumn";

export type Task = {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  member: string;
  dueDate: string;
  status: "todo" | "doing" | "completed" | "onHold";
};

type TaskBoardProps = {
  tasks: Task[];
  onAddTask: (status: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: Task["status"]
  ) => void;
};

export default function TaskBoard({
  tasks,
  onAddTask,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskBoardProps) {
  const columns = [
    { title: "To Do", status: "todo" as const },
    { title: "Doing", status: "doing" as const },
    { title: "Completed", status: "completed" as const },
    { title: "On Hold", status: "onHold" as const },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter(
            (task) => task.status === column.status
          )}
          onAddTask={onAddTask}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}