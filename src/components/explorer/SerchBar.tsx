"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search company..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
