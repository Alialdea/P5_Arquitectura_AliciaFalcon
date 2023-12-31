import { GraphQLError } from "graphql";
import { usuarioModelType } from "../db/usuario.ts";
import {coleccionModel, coleccionModelType } from "../db/coleccion.ts";

export const user = {
  collecioncomics: async (parent:usuarioModelType):Promise<coleccionModelType> => {
    const res = await coleccionModel.findById({_id:parent.coleccion}).exec()
    if(!res){
      throw new GraphQLError(`Internal API error`, {
        extensions: { code: "INTERNAL_ERROR" },
      });
    }
    return res;
  }
};