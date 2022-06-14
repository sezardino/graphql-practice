import { useState } from "react";
import { IProject, ProjectStatus, UpdateProjectInput } from "../types";

interface Props {
  submitHandler: (data: UpdateProjectInput) => void;
  project: Pick<IProject, "description" | "name" | "status">;
}

const statuses = [
  { name: "new", label: ProjectStatus.NOT_STARTED },
  { name: "progress", label: ProjectStatus.IN_PROGRESS },
  { name: "completed", label: ProjectStatus.COMPLETED },
];

export const EditProjectForm: React.FC<Props> = (props) => {
  const { project, submitHandler } = props;
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState<ProjectStatus>(() => {
    const neededStatus = statuses.find(
      (status) => status.label === project.status
    );

    if (!neededStatus) {
      return statuses[0].name as ProjectStatus;
    }

    return neededStatus.name as ProjectStatus;
  });

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await submitHandler({ name, description, status });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        {status}
        <select
          id="status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        >
          {statuses.map((status) => (
            <option key={status.name} value={status.name}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
