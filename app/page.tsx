import prisma from "./lib/prisma";
import Card from "./components/card";
import CreateForm from "./components/create-form";
import Filter from "./components/filters";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    tags?: string;
    fav?: string;
  }>
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q || "";
  const searchTagsArray = params.tags
    ? params.tags.split(",").map(t => t.trim()).filter(t => t.length > 0)
    : [];
  const searchFavsOnly = params.fav === "true";


  const bookmarks = await prisma.bookmark.findMany({
    where: {
      OR: searchQuery ? [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { url: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ] : undefined,

      isFavourite: searchFavsOnly ? true : undefined,

      tags: searchTagsArray.length > 0 ? {
        some: {
          name: { in: searchTagsArray, mode: "insensitive" }
        }
      } : undefined
    },
    include: {
      tags: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="p-5">
      <div>
        <h1 className="text-3xl font-bold mb-5">Create Bookmark</h1>
        <CreateForm />
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold mb-5">All Bookmarks</h1>
        <Filter />
        <div className="grid grid-cols-4">
          {bookmarks.map(b =>
            <Card
              key={b.id}
              id={b.id}
              title={b.title}
              url={b.url}
              description={b.description}
              isFavourite={b.isFavourite}
              createdAt={b.createdAt}
              tags={b.tags}
            />
          )}
        </div>
      </div>
    </div>
  );
}
