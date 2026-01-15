import { useState, useEffect } from 'react';
import { Star, GitFork, ExternalLink, Loader2, Github } from 'lucide-react';

const GitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sujalchauhan-ba/repos');
        if (!response.ok) {
            if (response.status === 404) throw new Error("GitHub user not found");
            throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();

        // Filter: Sort by stars desc, then updated_at desc. Take top 4.
        const filtered = data
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 4);

        setProjects(filtered);
      } catch (err) {
        console.error("GitHub Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
        <Loader2 className="spinner" style={{ display: 'inline-block', marginBottom: '10px' }} />
        <p>Loading GitHub Projects...</p>
      </div>
    );
  }

  if (error) {
    return (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
            <p>Could not load GitHub projects at this time.</p>
            <p style={{ fontSize: '0.8rem' }}>({error})</p>
            <a href="https://github.com/sujalchauhan-ba" target="_blank" rel="noreferrer" className="btn-nav" style={{ marginTop: '10px', display: 'inline-block' }}>View on GitHub</a>
        </div>
    );
  }

  if (projects.length === 0) {
      return (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
              <p>No public repositories found.</p>
              <a href="https://github.com/sujalchauhan-ba" target="_blank" rel="noreferrer" className="btn-nav" style={{ marginTop: '10px', display: 'inline-block' }}>View Profile</a>
          </div>
      );
  }

  return (
    <div className="github-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
      {projects.map((repo) => (
        <div key={repo.id} className="project-card" style={{ height: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div className="project-content" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="project-meta">{repo.language || 'Code'}</span>
                <a href={repo.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>
                    <ExternalLink size={16} />
                </a>
            </div>

            <h3 style={{ fontSize: '1.2rem', marginTop: '10px', marginBottom: '10px' }}>
                {repo.name.replace(/-/g, ' ')}
            </h3>

            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {repo.description || "No description available."}
            </p>
          </div>

          <div className="project-stats" style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="metric" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Star size={14} color="var(--accent)" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="metric" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <GitFork size={14} color="var(--accent)" />
              <span>{repo.forks_count}</span>
            </div>
             <div className="metric" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
               <span style={{ fontSize: '0.75rem', color: '#666' }}>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GitHubProjects;
