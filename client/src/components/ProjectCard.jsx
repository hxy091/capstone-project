import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className="card">
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="card-image" />
      )}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-text">{project.description}</p>
      </div>
      <div className="card-links">
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">Code</a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>}
      </div>
    </div>
  );
}

export default ProjectCard;
