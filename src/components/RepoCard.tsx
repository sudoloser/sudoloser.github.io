import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github } from 'lucide-react';
import type { Repo } from '../hooks/useGitHubRepos';

const RepoCard = ({ repo, index }: { repo: Repo, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      style={{ animationDelay: `${index * 0.2}s` }}
      className="group relative p-5 bg-slate-900/40 border border-slate-700/50 rounded-2xl transition-all duration-300 overflow-hidden animate-wobble"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink size={16} className="text-slate-500" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Github size={18} className="text-slate-400" />
          <h4 className="font-bold text-slate-100 group-hover:text-primary transition-colors truncate">
            {repo.name}
          </h4>
        </div>

        <p className="text-sm text-slate-400 line-clamp-2 h-10">
          {repo.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {repo.language}
              </span>
            )}
            <div className="flex items-center gap-1 text-slate-400">
              <Star size={12} />
              <span className="text-xs">{repo.stargazers_count}</span>
            </div>
          </div>
        </div>
      </div>

      <a 
        href={repo.html_url} 
        target="_blank" 
        rel="noreferrer"
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">View {repo.name} on GitHub</span>
      </a>
    </motion.div>
  );
};

export default RepoCard;
