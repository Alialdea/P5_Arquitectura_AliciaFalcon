import mongoose from "mongoose";
import { Comic } from "../types.ts";

const Schema = mongoose.Schema;

const comicSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  formato: { type: String, required: true },
});

export type comicModelType = mongoose.Document & Omit<Comic, "id" >;



export const comicModel = mongoose.model<comicModelType>("Comic", comicSchema);