"use client"

import { deleteBookmark } from "../lib/actions";
import { Bookmark } from "../lib/definitions";

const Card = ({
  id,
  title,
  url,
  description,
  isFavourite,
  createdAt,
  tags
}: Bookmark) => {
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-2 m-2 w-100 line-clamp-1">
      <h3 className="text-xl font-semibold">{title}</h3>
      <a href={url} className="underline text-blue-400 line-clamp-1">{url}</a>
      <div>
        {tags.map((t) =>
          <span key={t.id} className="border rounded-3xl bg-white mr-1 px-3 py-1 text-sm text-black font-semibold">{t.name}</span>
        )}
      </div>
      <div className="text-sm text-gray-400 mt-1 font-semibold">
        {createdAt.toDateString()}
      </div>
      <div>
        <button
          onClick={async () => {
            "use client"
            if (confirm("Are you sure you want to delete this?")) {
              await deleteBookmark(id);
            }
          }}
          className="bg-gray-800 rounded-xl text-sm font-semibold text-red-400 px-3 py-1 cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  )
}

export default Card;
