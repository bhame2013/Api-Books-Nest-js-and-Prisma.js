export type CategoryCreateInput = {
  id: number;
  number: number;
  title: string;
  url: string;
  parentId?: number | null;
};
