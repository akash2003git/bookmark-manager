"use client"

import Form from "next/form";
import { createBookmark } from "../lib/actions";
import { useState } from "react";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescritption] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSuggestTags() {
    if (!title) {
      alert("Please enter a title first so the AI has context!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/suggest-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      });

      const data = await response.json();
      if (data.tags) {
        setTags(data.tags);
      } else {
        console.error("No tags returned", data);
        alert("No tags returned")
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form action={createBookmark} className="border px-5 py-3 rounded-xl">
      {/* Title */}
      <div className="mb-2">
        <label htmlFor="title" className="text-white text-lg">Title: </label>
        <input onChange={(e) => setTitle(e.target.value)} id="title" name="title" type="text" value={title} placeholder="Enter title" required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* URL */}
      <div className="mb-2">
        <label htmlFor="url" className="text-white text-lg">URL: </label>
        <input id="url" name="url" type="url" placeholder="Enter URL" required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* Description */}
      <div className="mb-2">
        <label htmlFor="Description" className="text-white text-lg">Description: </label>
        <input onChange={(e) => setDescritption(e.target.value)} id="description" name="description" type="text" value={description} placeholder="Enter description" className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
      </div>

      {/* Mark as favourite */}
      <div className="mb-2">
        <label htmlFor="isFavourite" className="text-white text-lg">Favourite: </label>
        <input id="isFavourite" name="isFavourite" type="checkbox" value="true" />
      </div>

      {/* Tags */}
      <div className="mb-2">
        <label htmlFor="tags" className="text-white text-lg">Tags(, separated): </label>
        <input onChange={(e) => setTags(e.target.value)} id="tags" name="tags" type="text" placeholder="Enter tags" value={tags} required className="border bg-gray-800 text-white px-3 py-1 rounded-xl" />
        <button type="button" onClick={handleSuggestTags} disabled={isLoading} className="bg-white text-black ml-2 px-3 py-1 rounded-xl cursor-pointer">
          {isLoading ? "Suggesting..." : "Suggest Tags"}
        </button>
      </div>

      {/* Submit button */}
      <button type="submit" className="bg-white text-black px-3 py-1 rounded-xl cursor-pointer">Create Bookmark</button>
    </Form>
  )
}
