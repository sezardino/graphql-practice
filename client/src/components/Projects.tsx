import { IProject } from "../types";
import { ProjectCard } from "./ProjectCard";

interface Props extends React.HTMLProps<HTMLDivElement> {
  projects: IProject[];
}

export const Projects: React.FC<Props> = (props) => {
  const { projects } = props;

  if (!projects.length) {
    return (
      <div>
        <p>No Projects</p>
      </div>
    );
  }

  return (
    <div>
      <ul className="row mt-4 p-0">
        {projects.map((project) => (
          <li key={project.id} className="col-md-6">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};
