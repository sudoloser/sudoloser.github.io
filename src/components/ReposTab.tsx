import { useGitHubRepos } from '../hooks/useGitHubRepos';
import RepoCard from './RepoCard';
import { Loader2 } from 'lucide-react';

const ReposTab = () => {
  const { repos, loading, error } = useGitHubRepos('sudoloser');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 animate-wobble">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-slate-500 font-medium">Fetching repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-400 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {repos.map((repo, index) => (
        <div
          key={repo.id}
          className="animate-float"
          style={{ animationDelay: `${(index % 3) * 0.8}s`, animationDuration: `${6 + (index % 4) * 0.7}s` }}
        >
          <RepoCard repo={repo} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ReposTab;
