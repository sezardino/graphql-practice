import { IProject } from "../types";

interface Props extends React.HTMLProps<HTMLDivElement> {
  project: IProject;
}

export const ProjectCard: React.FC<Props> = (props) => {
  const { project } = props;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{project.name}</h5>
          <a className="btn btn-light" href={`/projects/${project.id}`}>
            View
          </a>
        </div>
        <p className="small">
          Status: <strong>{project.status}</strong>
        </p>
      </div>
    </div>
  );
};
