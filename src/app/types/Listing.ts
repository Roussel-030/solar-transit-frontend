export type ListingRequest = {
  id?: number;
  name: string;
  address: string;
  description: string;
  category_id: number;
  images?: any;
};

export type ListingResponse = {
  count: number;
  data: ListingRequest[];
};
