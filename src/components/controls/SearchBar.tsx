type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <input
        className="rounded-xl border border-gray-700 bg-gray-800 p-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search..."
        type="search"
        value={value}
      />
    </div>
  );
};
