import prisma from "./lib/prisma";
import Card from "./components/card";

export default async function Home() {
  const bookmarks = await prisma.bookmark.findMany({ include: { tags: true } });
  console.dir(bookmarks, { depth: null });

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">All Bookmarks</h1>
      <div className="flex justify-between">

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
  );
}
