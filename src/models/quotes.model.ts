export interface QuotesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Quote[];
}

export interface Quote {
  id: number;
  amount: number;
  created: string;
  title: string;
  supplier_id: number;
}
