"use client";

import type { Task } from "@/components/tasks/TaskBoard";

type FilterValues = {
  status: string;
  priority: string;
  member: string;
};

type TaskFiltersProps = {
  values: FilterValues;
  onChange: (filters: FilterValues) => void;
  onClose?: () => void;
};

export default function TaskFilters({
  values,
  onChange,
  onClose,
}: TaskFiltersProps) {
  const clearFilters = () => {
    onChange({
      status: "All",
      priority: "All",
      member: "All",
    });
  };

  return (
    <div className="w-full max-w-[360px] rounded-xl border border-[#e5e5e5] bg-white p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#171717]">
          Filters
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-lg text-[#999999] hover:text-[#171717]"
          aria-label="Close filters"
        >
          ×
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Status
          </label>

          <select
            value={values.status}
            onChange={(event) =>
              onChange({
                ...values,
                status: event.target.value,
              })
            }
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm outline-none focus:border-[#999999]"
          >
            <option>All</option>
            <option>To Do</option>
            <option>Doing</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Priority
          </label>

          <select
            value={values.priority}
            onChange={(event) =>
              onChange({
                ...values,
                priority: event.target.value,
              })
            }
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm outline-none focus:border-[#999999]"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-[#666666]">
            Members
          </label>

          <select
            value={values.member}
            onChange={(event) =>
              onChange({
                ...values,
                member: event.target.value,
              })
            }
            className="w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-sm outline-none focus:border-[#999999]"
          >
            <option>All</option>
            <option>A</option>
            <option>CN</option>
            <option>Dev</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#eeeeee] pt-4">
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-[#666666] hover:text-[#171717]"
        >
          Clear filters
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
        >
          Apply
        </button>
      </div>
    </div>
  );
}