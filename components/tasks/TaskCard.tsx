"use client";

import { useState } from "react";
import type { Task } from "./TaskBoard";

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const statusOptions = [
    { label: "To Do", value: "todo" as const },
    { label: "Doing", value: "doing" as const },
    { label: "Completed", value: "completed" as const },
    { label: "On Hold", value: "onHold" as const },
  ];

  return (
    <article className="relative rounded-lg border border-[#e5e5e5] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium text-[#171717]">
          {task.title}
        </h3>

        <button
          type="button"
          onClick={() => setShowMenu((current) => !current)}
          className="text-lg leading-none text-[#999999] hover:text-[#171717]"
        >
          •••
        </button>
      </div>

      {showMenu && (
        <div className="absolute right-3 top-10 z-10 w-36 rounded-md border border-[#e5e5e5] bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              onEdit(task);
              setShowMenu(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-[#555555] hover:bg-[#f5f5f5]"
          >
            Edit
          </button>

          <div className="my-1 border-t border-[#eeeeee]" />

          <p className="px-3 py-1 text-[11px] font-medium text-[#999999]">
            Move to
          </p>

          {statusOptions
            .filter((option) => option.value !== task.status)
            .map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onStatusChange(task.id, option.value);
                  setShowMenu(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-[#555555] hover:bg-[#f5f5f5]"
              >
                {option.label}
              </button>
            ))}

          <div className="my-1 border-t border-[#eeeeee]" />

          <button
            type="button"
            onClick={() => {
              onDelete(task.id);
              setShowMenu(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-[#f5f5f5]"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-md px-2 py-1 text-xs ${
            task.priority === "High"
              ? "bg-red-50 text-red-500"
              : task.priority === "Medium"
                ? "bg-orange-50 text-orange-500"
                : "bg-gray-50 text-gray-600"
          }`}
        >
          {task.priority}
        </span>

        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f1f1] text-xs text-[#555555]">
          {task.member}
        </span>

        <span className="text-xs text-[#888888]">
          {task.dueDate}
        </span>
      </div>
    </article>
  );
}