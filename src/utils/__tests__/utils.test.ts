import { describe, it, expect } from 'vitest';
import { mapSearchResults } from '../utils';
import { ApiResult } from '../../types/search';

const mockResults: ApiResult[] = [
  {
    name: null,
    full_name: 'owner1/repo1',
    repository_url: 'https://github.com/owner1/repo1',
    stars: 100,
    description: 'A description for repo1',
    homepage: 'https://repo1.com',
  },
  {
    name: 'Repo2',
    full_name: 'owner2/repo2',
    repository_url: 'https://github.com/owner2/repo2',
    stars: 200,
    description: 'A description for repo2',
    homepage: 'https://repo2.com',
  },
  {
    name: 'Repo3',
    full_name: 'owner3/repo3',
    repository_url: '',
    stars: 300,
    description: null,
    homepage: null,
  },
  {
    name: null,
    full_name: 'owner4/repo4',
    repository_url: '',
    stars: 400,
    description: 'A description for repo4',
    homepage: 'https://repo4.com',
  },
];

describe('mapSearchResults', () => {
  it('maps search results and extracts owner from repository_url', () => {
    const results = mapSearchResults(mockResults);

    expect(results).toEqual([
      {
        name: 'repo1',
        owner: 'owner1',
        stars: 100,
        description: 'A description for repo1',
        homepage: 'https://repo1.com',
      },
      {
        name: 'Repo2',
        owner: 'owner2',
        stars: 200,
        description: 'A description for repo2',
        homepage: 'https://repo2.com',
      },
      {
        name: 'Repo3',
        owner: 'Unknown',
        stars: 300,
        description: null,
        homepage: null,
      },
      {
        name: 'repo4',
        owner: 'Unknown',
        stars: 400,
        description: 'A description for repo4',
        homepage: 'https://repo4.com',
      },
    ]);
  });

  it('handles empty repository_url by returning "Unknown" as owner', () => {
    const resultWithEmptyUrl = [
      {
        name: 'RepoX',
        full_name: 'ownerX/repoX',
        repository_url: '',
        stars: 500,
        description: 'A description for repoX',
        homepage: 'https://repoX.com',
      },
    ];

    const results = mapSearchResults(resultWithEmptyUrl);

    expect(results).toEqual([
      {
        name: 'RepoX',
        owner: 'Unknown',
        stars: 500,
        description: 'A description for repoX',
        homepage: 'https://repoX.com',
      },
    ]);
  });

  it('falls back to full_name when name is null', () => {
    const resultWithNullName = [
      {
        name: null,
        full_name: 'ownerY/repoY',
        repository_url: 'https://github.com/ownerY/repoY',
        stars: 600,
        description: 'A description for repoY',
        homepage: 'https://repoY.com',
      },
    ];

    const results = mapSearchResults(resultWithNullName);

    expect(results).toEqual([
      {
        name: 'repoY',
        owner: 'ownerY',
        stars: 600,
        description: 'A description for repoY',
        homepage: 'https://repoY.com',
      },
    ]);
  });
});
