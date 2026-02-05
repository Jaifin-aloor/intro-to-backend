export type Bookmark = {
    id: string;
    url: string;
    name: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
}

export const bookmarks: Bookmark[] = [];

export const tagIndex: Map<string, Set<string>> = new Map();
