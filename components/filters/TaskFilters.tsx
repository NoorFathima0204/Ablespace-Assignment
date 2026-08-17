"use client";

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

const filterOptions = {
  status: [
    "All",
    "To Do",
    "Doing",
    "Completed",
    "On Hold",
  ],
  priority: [
    "All",
    "No Priority",
    "Urgent",
    "High",
    "Medium",
    "Low",
  ],
  member: [
    "All",
    "A",
    "CN",
    "Dev",
  ],
};

export default function TaskFilters({
  values,
  onChange,
  onClose,
}: TaskFiltersProps) {
  const updateFilter = (
    key: keyof FilterValues,
    value: string
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onChange({
      status: "All",
      priority: "All",
      member: "All",
    });
  };

  return (
    <div className="w-[280px] rounded-lg border border-[#e5e5e5] bg-white p-2 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#eeeeee] px-3 py-2.5">
        <span className="text-sm font-medium text-[#171717]">
          Filter
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="flex h-6 w-6 items-center justify-center rounded text-lg text-[#999999] transition hover:bg-[#f5f5f5] hover:text-[#171717]"
        >
          ×
        </button>
      </div>

      <div className="py-1">
        <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-[#999999]">
          Status
        </div>

        {filterOptions.status.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => updateFilter("status", option)}
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              values.status === option
                ? "bg-[#f3f3f3] text-[#171717]"
                : "text-[#555555] hover:bg-[#f7f7f7]"
            }`}
          >
            <span>{option}</span>

            {values.status === option && (
              <span className="text-xs">✓</span>
            )}
          </button>
        ))}

        <div className="my-2 border-t border-[#eeeeee]" />

        <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-[#999999]">
          Priority
        </div>

        {filterOptions.priority.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              updateFilter("priority", option)
            }
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              values.priority === option
                ? "bg-[#f3f3f3] text-[#171717]"
                : "text-[#555555] hover:bg-[#f7f7f7]"
            }`}
          >
            <span>{option}</span>

            {values.priority === option && (
              <span className="text-xs">✓</span>
            )}
          </button>
        ))}

        <div className="my-2 border-t border-[#eeeeee]" />

        <div className="px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-[#999999]">
          Members
        </div>

        {filterOptions.member.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              updateFilter("member", option)
            }
            className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
              values.member === option
                ? "bg-[#f3f3f3] text-[#171717]"
                : "text-[#555555] hover:bg-[#f7f7f7]"
            }`}
          >
            <span>{option}</span>

            {values.member === option && (
              <span className="text-xs">✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#eeeeee] px-3 py-2.5">
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs text-[#666666] transition hover:text-[#171717]"
        >
          Clear filters
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-[#171717] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#333333]"
        >
          Done
        </button>
      </div>
    </div>
  );
}