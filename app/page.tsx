import prisma from "./lib/prisma";
import Card from "./components/card";
import CreateForm from "./components/create-form";

export default async function Home() {
  const bookmarks = await prisma.bookmark.findMany({ include: { tags: true } });

  return (
    <div className="p-5">
      <div>
        <h1 className="text-3xl font-bold mb-5">Create Bookmark</h1>
        <CreateForm />
      </div>
      <div className="mt-5">
        <h1 className="text-3xl font-bold mb-5">All Bookmarks</h1>
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
