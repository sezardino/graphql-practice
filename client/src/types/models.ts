export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export enum ProjectStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface IProject {
  id: string;
  client: IClient;
  name: string;
  description: string;
  status: ProjectStatus;
}

export type ClientInput = Pick<IClient, "email" | "name" | "phone">;

export type ProjectInput = Pick<IProject, "description" | "name"> & {
  clientId: string;
};

export type UpdateProjectInput = Partial<
  Pick<IProject, "description" | "name" | "status">
>;
