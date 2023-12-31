import mongoose from "mongoose";
import { Usuario } from "../types.ts";
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  coleccion: {type:Schema.Types.ObjectId,ref:'Coleccion', required:true},
});

export type usuarioModelType = mongoose.Document & Omit<Usuario, "id">;


export const usuarioModel = mongoose.model<usuarioModelType>(
  "Usuario",
  usuarioSchema
);