import prisma from "./lib/prisma";

export default async function Home() {
  const bookmarks = await prisma.bookmark.findMany({ include: { tags: true } });
  console.dir(bookmarks, { depth: null });

  return (
    <div>
      <ul>
        {bookmarks.map((b) => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  );
}
