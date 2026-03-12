const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-content">
        <span className="project-meta">{project.category}</span>
        <h3>{project.title}</h3>
        <p style={{ color: '#cbd5e1', margin: '20px 0' }}>
          <strong>Challenge:</strong> {project.challenge}
        </p>
        <p style={{ color: 'var(--text-gray)' }}>
          <strong>Solution:</strong> {project.solution}
        </p>
      </div>
      <div className="project-stats">
        {project.metrics.map((metric, i) => (
          <div key={i} className="metric">
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
