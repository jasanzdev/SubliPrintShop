"use client";
import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Handle search submission logic here
      }}
      className="relative w-full rounded-lg border bg-neutral-300"
    >
      <input
        key="q"
        type="text"
        name="search"
        placeholder="Search for products..."
        autoComplete="off"
        className="w-full form-input rounded-lg border-border px-4 py-2 text-sm text-background
         focus:outline-none focus:ring-2"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-4" />
      </div>
    </form>
  );
};

export default Search;
