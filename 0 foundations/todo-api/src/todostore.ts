export type Item = {
    id: string;
    content: string;
    state: boolean;
    createdAt: number;
    updatedAt: number;
}

export const items: Item[] = [];