export type Tag = {
  id: string;
  name: string;
}

export type Bookmark = {
  id: string;
  url: string;
  title: string;
  description: string | null;
  isFavourite: boolean;
  createdAt: Date;
  tags: Tag[];
}
