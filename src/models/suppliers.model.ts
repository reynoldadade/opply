export interface SuppliersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Supplier[];
}

export interface Supplier {
  id: number;
  name: string;
  description: string;
}
