import { useState } from "react";
import { IClient, ProjectInput } from "../types";

interface Props {
  submitHandler: (data: ProjectInput) => void;
  clients: IClient[];
}

export const AddProjectForm: React.FC<Props> = (props) => {
  const { clients, submitHandler } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!name || !clientId) {
      return;
    }

    submitHandler({ name, clientId, description });
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
        <label className="form-label">Client</label>
        <select
          id="clientId"
          className="form-select"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
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
