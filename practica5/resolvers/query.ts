import { GraphQLError } from "graphql";
import { comicModel, comicModelType } from "../db/comic.ts";
import { usuarioModel, usuarioModelType } from "../db/dbusuario.ts";
import { coleccionModel } from "../db/dbcoleccion.ts";

export const Query = {
  comics: async (): Promise<comicModelType[]> => {
    const comics = await comicModel.find().exec();
    return comics;
  },

  comic: async (_: unknown, args: { id: string }): Promise<comicModelType> => {
    const comic = await comicModel.findById(args.id);
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },

  usuarios: async (): Promise<usuarioModelType[]> => {
    const usuarios = await usuarioModel.find().exec();
    return usuarios;
  },

  usuario: async (
    _: unknown,
    args: { id: string }
  ): Promise<usuarioModelType> => {
    const usuario = await usuarioModel.findById(args.id);
    if (!usuario) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return usuario;
  },
};