export type CategoryRequest = {
  id?: number;
  name: string;
};

export type CategoryResponse = {
  count: number;
  data: CategoryRequest[];
};
