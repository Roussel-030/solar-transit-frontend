export type ListingRequest = {
  id?: number;
  name: string;
  address: string;
  description: string;
  category_id: number;
  latitude: string;
  longitude: string;
  image_name?: any;
  created_by: number;
};

export type ListingImageRequest = {
  name: string;
  listing_id: number;
};

export type ListingResponse = {
  count: number;
  data: ListingRequest[];
};
