import { GraphQLError } from "graphql";
import { usuarioModelType } from "../db/dbusuario.ts";
import {coleccionModel, coleccionModelType } from "../db/dbcoleccion.ts";

export const Usuario = {
  coleccion: async (parent:usuarioModelType):Promise<coleccionModelType> => {
    const res = await coleccionModel.findById({_id:parent.coleccion}).exec()
    if(!res){
      throw new GraphQLError(`Internal API error`, {
        extensions: { code: "INTERNAL_ERROR" },
      });
    }
    return res;
  }
};