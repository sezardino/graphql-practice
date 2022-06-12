import { Schema, model } from "mongoose";

export interface IClient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const ClientSchema = new Schema<IClient>({
  email: { type: String, required: true },

  name: { type: String, required: true },

  phone: { type: String, required: true },
});

export const Client = model<IClient>("Client", ClientSchema);
