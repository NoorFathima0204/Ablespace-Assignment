"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Task } from "./TaskBoard";

type TaskModalProps = {
  defaultStatus?: Task["status"];
  task?: Task | null;
  onClose: () => void;
  onAdd: (task: Omit<Task, "id">) => void;
};

export default function TaskModal({
  defaultStatus = "todo",
  task,
  onClose,
  onAdd,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] =
    useState<Task["priority"]>("Medium");
  const [member, setMember] = useState("A");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setMember(task.member);
    } else {
      setTitle("");
      setPriority("Medium");
      setMember("A");
      setDueDate("");
    }
  }, [task]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      priority,
      member,
      dueDate: dueDate || task?.dueDate || "No due date",
      status: task?.status ?? defaultStatus,
    });

    onClose();
  };

  const isEditing = Boolean(task);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#171717]">
            {isEditing ? "Edit Task" : "Add Task"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-[#999999] hover:text-[#171717]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#555555]">
              Task title
            </label>

            <input
              autoFocus
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none focus:border-[#999999]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#555555]">
              Priority
            </label>

            <select
              value={priority}
              onChange={(event) =>
                setPriority(
                  event.target.value as Task["priority"]
                )
              }
              className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#555555]">
              Member
            </label>

            <select
              value={member}
              onChange={(event) => setMember(event.target.value)}
              className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
            >
              <option value="A">A</option>
              <option value="CN">CN</option>
              <option value="Dev">Dev</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#555555]">
              Due date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-md border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#e5e5e5] px-4 py-2 text-sm text-[#666666]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
            >
              {isEditing ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}