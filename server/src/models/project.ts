import { Schema, model } from "mongoose";

export enum ProjectStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export interface IProject {
  clientId: Schema.Types.ObjectId;
  name: string;
  description: string;
  status: ProjectStatus;
}

const ProjectSchema = new Schema<IProject>({
  description: { type: String, required: true },

  name: { type: String, required: true },

  status: {
    type: String,
    enum: ProjectStatus,
    required: true,
  },

  clientId: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
});

export const Project = model<IProject>("Project", ProjectSchema);
