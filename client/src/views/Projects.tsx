import { useMutation, useQuery } from "@apollo/client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import {
  ClientInfo,
  EditProjectForm,
  Modal,
  ViewComponent,
} from "../components";
import { mutations, queries } from "../graphql";
import { IProject, UpdateProjectInput } from "../types";

export const Projects = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery<{ project: IProject }>(
    queries.GET_PROJECT,
    { variables: { id } }
  );
  const [deleteHandler] = useMutation(mutations.REMOVE_PROJECT, {
    variables: { id },
  });

  const [updateHandler] = useMutation(mutations.UPDATE_PROJECT);

  const onDelete = async () => {
    try {
      await deleteHandler();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (dto: UpdateProjectInput) => {
    try {
      await updateHandler({ variables: { ...dto, id: data?.project.id } });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ViewComponent loading={loading} error={error} hasData={!!data?.project}>
      {data && data.project && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <div>
            <h5 className="mt-5">Client Information</h5>
            <ClientInfo client={data.project.client} />
          </div>

          {/* <EditProjectForm project={data.project} /> */}

          <div className="d-flex justify-content-between mt-5">
            <Modal
              content={
                <EditProjectForm
                  submitHandler={onUpdate}
                  project={data.project}
                />
              }
              label="Update Project Details"
              name="edit-project"
              trigger={
                <>
                  <FaPencilAlt className="icon" />
                  Update Project
                </>
              }
            />
            <button className="btn btn-danger m-2" onClick={onDelete}>
              <FaTrash className="icon" /> Delete Project
            </button>
          </div>
        </div>
      )}
    </ViewComponent>
  );
};
