import {fetchRepositoriesBySearch} from '../api/githubApi'
import { GithubApiRepo, GithubRepoQuery } from '../types/types';

// Intermediate service method to fetch repositories

export class GithubService {
    async getAllRepositories(
       queries: GithubRepoQuery
      ): Promise<{items: GithubApiRepo[], total_count: number} >{
          const res = await fetchRepositoriesBySearch(queries.qSearch, queries.page, queries.perPage, queries.sort);
          // Map the GitHub API response to the Repo type
          return {
            ...res, 
            items: res.items.map((repo: any): GithubApiRepo => {
              return {
                id: repo.id,
                name: repo.name,
                full_name: repo.full_name,
                description: repo.description || null,
                stars_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                watchers_count: repo.watchers_count,
                html_url: repo.html_url,
                owner_name: repo.owner.login,
                owner_avatar_url: repo.owner.avatar_url,
                license: repo.license?.name || null,
                topics: repo.topics || [],
                creation_date: repo.created_at,
                last_updated: repo.updated_at,
                last_pushed: repo.pushed_at,
                open_issues_count: repo.open_issues,
                owner_type: repo.owner.type || null,
              }
            })
        }
    }      
}
