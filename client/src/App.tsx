import { useMutation, useQuery } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import { AddClientForm, Clients, Header, Modal, Spinner } from "./components";
import { mutations, queries } from "./graphql";
import { IClient } from "./types";

export const App = () => {
  const { data, loading, error, refetch } = useQuery<{ clients: IClient[] }>(
    queries.GET_CLIENTS
  );
  const [deleteClientHandler] = useMutation(mutations.REMOVE_CLIENT);
  const [addClientHandler] = useMutation(mutations.ADD_CLIENT);

  const handleDelete = async (id: string) => {
    await deleteClientHandler({ variables: { id } });
    refetch();
  };

  const handleAdd = async (data: Pick<IClient, "email" | "name" | "phone">) => {
    await addClientHandler({ variables: { ...data } });
    refetch();
  };

  return (
    <>
      <Header />
      <main className="container">
        <Modal
          label="Add Client"
          name="add-client"
          trigger={
            <>
              <FaUser className="icon" />
              <div>Add Client</div>
            </>
          }
          content={<AddClientForm submitHandler={handleAdd} />}
        />
        {loading && <Spinner />}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && data && (
          <Clients clients={data.clients} deleteHandler={handleDelete} />
        )}
      </main>
    </>
  );
};
