import { useMutation, useQuery } from "@apollo/client";
import { FaUser, FaList } from "react-icons/fa";
import {
  AddClientForm,
  AddProjectForm,
  Clients,
  Modal,
  Projects,
  ViewComponent,
} from "../components";
import { mutations, queries } from "../graphql";
import { ClientInput, IClient, IProject, ProjectInput } from "../types";

export const Home = () => {
  const {
    data: clientsData,
    loading: clientsLoading,
    error: clientsError,
  } = useQuery<{ clients: IClient[] }>(queries.GET_CLIENTS);
  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
    refetch: projectsRefetch,
  } = useQuery<{ projects: IProject[] }>(queries.GET_PROJECTS);
  const [deleteClientHandler] = useMutation(mutations.REMOVE_CLIENT, {
    refetchQueries: [
      { query: queries.GET_PROJECTS },
      { query: queries.GET_CLIENTS },
    ],
  });
  const [addClientMutation] = useMutation(mutations.ADD_CLIENT, {
    refetchQueries: [{ query: queries.GET_CLIENTS }],
  });
  const [addProjectMutation] = useMutation(mutations.ADD_PROJECT);

  const handleDelete = async (id: string) => {
    await deleteClientHandler({ variables: { id } });
  };

  const addClientHandler = async (data: ClientInput) => {
    await addClientMutation({ variables: { ...data } });
  };

  const addProjectHandler = async (data: ProjectInput) => {
    await addProjectMutation({ variables: { ...data } });
    projectsRefetch();
  };

  return (
    <main className="container">
      <div className="d-flex gap-1">
        <Modal
          label="Add Client"
          name="add-client"
          trigger={
            <>
              <FaUser className="icon" />
              <div>Add Client</div>
            </>
          }
          content={<AddClientForm submitHandler={addClientHandler} />}
        />
        {clientsData?.clients && clientsData.clients.length > 0 && (
          <Modal
            label="Add Project"
            name="add-project"
            trigger={
              <>
                <FaList className="icon" />
                <div>Add New Project</div>
              </>
            }
            content={
              <AddProjectForm
                clients={clientsData.clients}
                submitHandler={addProjectHandler}
              />
            }
          />
        )}
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
