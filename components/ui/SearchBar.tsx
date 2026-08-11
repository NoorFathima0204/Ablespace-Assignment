"use client";

type SearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="flex h-9 w-[220px] items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3">
      <span className="text-sm text-[#999999]">⌕</span>

      <input
        type="text"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#171717] outline-none placeholder:text-[#999999]"
      />
    </div>
  );
}