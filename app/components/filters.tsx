"use client"

import { useSearchParams, useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localSearch, setLocalSearch] = useState(searchParams.get("q") || "");
  const [localTags, setLocalTags] = useState(searchParams.get("tags") || "");
  const currentFav = searchParams.get("fav") === "true";

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrlParameter("q", localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrlParameter("tags", localTags);
    }, 300);

    return () => clearTimeout(timer);
  }, [localTags]);

  function updateUrlParameter(key: "q" | "tags" | "fav", value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "false") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <div className="border bg-gray-900 rounded-xl p-5 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search title, url or description..."
        onChange={(e) => setLocalSearch(e.target.value)}
        value={localSearch}
        className="border bg-gray-800 text-white placeholder-gray-400 p-2 rounded-xl"
      />

      <input
        type="text"
        placeholder="Search tags (',' separated)..."
        onChange={(e) => setLocalTags(e.target.value)}
        value={localTags}
        className="border bg-gray-800 text-white placeholder-gray-400 p-2 rounded-xl"
      />

      <label className="flex items-center gap-2 text-white cursor-pointer select-none">
        <input
          type="checkbox"
          checked={currentFav}
          onChange={(e) => updateUrlParameter("fav", e.target.checked ? "true" : "")}
          className="w-4 h-4 rounded bg-gray-800 border-gray-700 accent-yellow-400"
        />
        <span>Show Favourites Only</span>
      </label>

      {isPending && <span className="text-xs text-gray-400 animate-pulse">Filtering data...</span>}
    </div>
  );
}
