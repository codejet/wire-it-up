import { ApiResult } from '../types/search';

const extractOwnerFromUrl = (url: string) => {
  if (!url) return 'Unknown';

  const path = url.split('github.com/')[1];
  const owner = path.split('/')[0];

  return owner;
};

export const mapSearchResults = (results: ApiResult[]) => {
  return results.map((result: ApiResult) => ({
    name: result.name ?? result.full_name.split('/')[1],
    owner: extractOwnerFromUrl(result.repository_url),
    stars: result.stars,
    description: result.description,
    homepage: result.homepage,
  }));
};
