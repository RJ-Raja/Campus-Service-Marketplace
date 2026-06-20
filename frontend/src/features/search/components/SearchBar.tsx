import React from 'react';

type Props = {
  query: string;
  setQuery: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<Props> = ({ query, setQuery, category, setCategory, onSearch }) => {
  return (
    <div className="flex gap-2 mb-4">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services" className="flex-1 rounded border p-2" />
      <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-48 rounded border p-2" />
      <button onClick={onSearch} className="rounded bg-blue-600 text-white px-4">Search</button>
    </div>
  );
};

export default SearchBar;
