import { useMutation, useQuery } from "@apollo/client";
import { FaUser } from "react-icons/fa";
import {
  AddClientForm,
  Clients,
  Modal,
  Projects,
  ViewComponent,
} from "../components";
import { mutations, queries } from "../graphql";
import { ClientInput, IClient, IProject } from "../types";

export const Home = () => {
  const {
    data: clientsData,
    loading: clientsLoading,
    error: clientsError,
    refetch: clientsRefetch,
  } = useQuery<{ clients: IClient[] }>(queries.GET_CLIENTS);
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
    refetch: projectsRefetch,
  } = useQuery<{ projects: IProject[] }>(queries.GET_PROJECTS);
  const [deleteClientHandler] = useMutation(mutations.REMOVE_CLIENT);
  const [addClientHandler] = useMutation(mutations.ADD_CLIENT);

  const handleDelete = async (id: string) => {
    await deleteClientHandler({ variables: { id } });
    clientsRefetch();
  };

  const handleAdd = async (data: ClientInput) => {
    await addClientHandler({ variables: { ...data } });
    clientsRefetch();
  };

  return (
    <main className="container">
      <div>
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
      </div>
      <ViewComponent
        loading={projectsLoading}
        error={projectsError}
        hasData={!!projectsData?.projects}
      >
        <Projects projects={projectsData?.projects!} />
      </ViewComponent>
      <hr />
      <ViewComponent
        loading={clientsLoading}
        error={clientsError}
        hasData={!!clientsData?.clients}
      >
        <Clients clients={clientsData?.clients!} deleteHandler={handleDelete} />
      </ViewComponent>
    </main>
  );
};
