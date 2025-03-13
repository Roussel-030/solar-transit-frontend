export type Listing = {
  id?: number;
  name: string;
  address: string;
  description: string;
  category_id: number;
  images?: any;
};

export type ResponseListing = {
  count: number;
  data: Listing[];
};
