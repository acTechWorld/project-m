import { Router } from 'express';
import { GithubService } from '../services/githubService';
import { fetchGithubRepos, initCronsFetchGithubRepos } from '../scripts/fetchGithubRepos'
const router = Router();
const githubService = new GithubService();

router.get('/', async (req, res) => {
  try {
    const repositories = await githubService.getAllRepositories(req.query as any);
    res.json(repositories);
  } catch (error: any) {
    res.status(500).json({ message: 'Error getting github repositories', error:  error.message ?? error });
  }
});

router.get('/fetchGithubRepos', async (req, res) => {
    try {
      fetchGithubRepos(req.query.query as string, req.query.language as string);
      res.json('Script launched');
    } catch (error: any) {
      res.status(500).json({ message: 'Error starting script', error:  error.message ?? error });
    }
  });

  router.get('/initCronJobs', async (req, res) => {
    try {
      initCronsFetchGithubRepos();
      res.json('Crons launched');
    } catch (error: any) {
      res.status(500).json({ message: 'Error starting crons', error:  error.message ?? error });
    }
  });
export default router;