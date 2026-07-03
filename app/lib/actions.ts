"use server"

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBookmark(formdata: FormData) {
  const title = formdata.get("title") as string;
  const url = formdata.get("url") as string;
  const description = formdata.get("description") as string || null;
  const isFavourite = formdata.get("isFavourite") === "true";

  const rawTags = formdata.get("tags") as string;

  const tagsArray = rawTags
    .split(",")
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

  await prisma.bookmark.create({
    data: {
      title,
      url,
      description,
      isFavourite,
      tags: {
        connectOrCreate: tagsArray.map(tagName => ({
          where: { name: tagName },
          create: { name: tagName }
        }))
      }
    }
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteBookmark(id: string) {
  await prisma.$transaction(async (tx) => {
    await tx.bookmark.delete({
      where: { id }
    });

    await tx.tag.deleteMany({
      where: {
        bookmarks: {
          none: {}
        }
      }
    });
  });

  revalidatePath("/");
}
