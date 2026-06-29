export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  ownerId: string;
  createdAt: string;
}

export interface PropertiesResponse {
  status: string;
  results: number;
  data: PropertyListing[];
}
