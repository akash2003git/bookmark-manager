import Form from "next/form";
import { createBookmark } from "../lib/actions";

export default async function CreateForm() {
  return (
    <Form action={createBookmark} className="border px-5 py-3 rounded-xl">
      {/* Title */}
      <div className="mb-2">
        <label htmlFor="title" className="text-white text-lg">Title: </label>
        <input id="title" name="title" type="text" placeholder="Enter title" required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* URL */}
      <div className="mb-2">
        <label htmlFor="url" className="text-white text-lg">URL: </label>
        <input id="url" name="url" type="url" placeholder="Enter URL" required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* Description */}
      <div className="mb-2">
        <label htmlFor="Description" className="text-white text-lg">Description: </label>
        <input id="description" name="description" type="text" placeholder="Enter description" className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* Mark as favourite */}
      <div className="mb-2">
        <label htmlFor="isFavourite" className="text-white text-lg">Favourite: </label>
        <input id="isFavourite" name="isFavourite" type="checkbox" value="true" />
      </div>

      {/* Tags */}
      <div className="mb-2">
        <label htmlFor="tags" className="text-white text-lg">Tags(, separated): </label>
        <input id="tags" name="tags" type="text" placeholder="Enter tags" required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* Submit button */}
      <button type="submit" className="bg-white text-black px-3 py-1 rounded-xl cursor-pointer">Create Bookmark</button>
    </Form>
  )
}
