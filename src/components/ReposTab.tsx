import { useGitHubRepos } from '../hooks/useGitHubRepos';

const langColors: Record<string, string> = {
  TypeScript: '#0059f3',
  JavaScript: '#f3e300',
  Python: '#49db8a',
  Rust: '#ba4900',
  Java: '#ba4900',
  'C++': '#8a00d3',
  C: '#808080',
  'C#': '#00a238',
  HTML: '#fb9200',
  CSS: '#30baf3',
  Shell: '#00fb00',
  Kotlin: '#fb0092',
  Go: '#30baf3',
  Lua: '#000092',
  Dart: '#0059f3',
  PHP: '#61829a',
  Svelte: '#fb0018',
  Vue: '#00a238',
};

const LoadingDots = () => (
  <div className="loading-container">
    {Array.from({ length: 9 }).map((_, i) => (
      <div key={i} className={`loading-${i + 1}`} />
    ))}
  </div>
);

const ReposTab = () => {
  const { repos, loading, error } = useGitHubRepos('sudoloser');

  if (loading) {
    return (
      <div className="alert">
        <LoadingDots />
        <span>Fetching repositories...</span>
        <LoadingDots />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="sl-repo-grid">
      {repos.map((repo) => (
        <div key={repo.id} className="pictochat-message sl-repo-card sl-float">
          <header className="ds-turquoise-50">{repo.name}</header>
          <span>{repo.description || 'No description provided.'}</span>
          <div className="sl-repo-meta">
            <span>
              {repo.language && (
                <>
                  <span
                    className="sl-lang-dot"
                    style={{ backgroundColor: langColors[repo.language] ?? '#808080' }}
                  />
                  {repo.language}
                </>
              )}
            </span>
            <span>★ {repo.stargazers_count}</span>
          </div>
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="sl-cover">
            <span className="sr-only">View {repo.name} on GitHub</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ReposTab;
