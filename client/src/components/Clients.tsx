import { FaTrash } from "react-icons/fa";
import { IClient } from "../types";

interface Props extends React.HTMLProps<HTMLTableElement> {
  clients: IClient[];
  deleteHandler: (id: string) => void;
}

export const Clients: React.FC<Props> = (props) => {
  const { clients, deleteHandler } = props;

  return (
    <table className="table table-hover mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                aria-label="delete this client"
                onClick={() => deleteHandler(client.id)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
