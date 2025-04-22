import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder,
  onSearch,
  className = "",
}: SearchInputProps) {
  const [query, setQuery] = useState("");

  // Debounce search to avoid excessive filtering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-2.5 size-4 text-gray-500" />
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-9"
        aria-label={placeholder}
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            onSearch("");
          }}
          className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
