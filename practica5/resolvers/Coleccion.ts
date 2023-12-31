import { GraphQLError } from "graphql";
import { coleccionModel, coleccionModelType } from "../db/dbcoleccion.ts";
import { comicModel, comicModelType } from "../db/comic.ts";
import { usuarioModel } from "../db/dbusuario.ts";

export const Coleccion = {
  comics: async (parent: coleccionModelType): Promise<comicModelType[]> => {
    const comicsPromises: Promise<comicModelType>[] = parent.comics.map(async (id: string) => {
      const res = await comicModel.findById(id).exec();
      if (!res) {
        throw new GraphQLError(`Internal API error`, {
          extensions: { code: "INTERNAL_ERROR" },
        });
      }
      return res;
    });

    const comics: comicModelType[] = await Promise.all(comicsPromises);

    return comics;
  },
};
