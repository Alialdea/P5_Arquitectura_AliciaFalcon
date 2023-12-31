import mongoose from "mongoose";
import { Coleccion } from "../types.ts"; 

const Schema = mongoose.Schema;

const coleccionSchema = new Schema({
  nombre: { type: String, required: true },
  comics: { type: [Schema.Types.ObjectId], ref: 'Comic', required: true },
});

export type coleccionModelType = mongoose.Document & Omit<Coleccion, "id">;

export const coleccionModel = mongoose.model<coleccionModelType>("Coleccion", coleccionSchema); 