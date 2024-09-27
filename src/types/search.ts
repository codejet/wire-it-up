export type SortingOptions = 'rank' | 'stars';

export interface ApiResult {
  name: string | null;
  full_name: string;
  repository_url: string;
  stars: number;
  description: string | null;
  homepage: string | null;
}

export type SearchResult = Omit<ApiResult, 'repository_url' | 'full_name'> & {
  owner: string;
};
