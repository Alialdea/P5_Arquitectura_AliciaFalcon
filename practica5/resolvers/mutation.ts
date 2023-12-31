import { GraphQLError } from "graphql";
import { comicModel, comicModelType } from "../db/comic.ts";
import { usuarioModel, usuarioModelType } from "../db/dbusuario.ts";
import { coleccionModel } from "../db/dbcoleccion.ts";

export const Mutation = {
  addComic: async (
    _: unknown,
    args: { titulo: string; descripcion: string; formato: string }
  ): Promise<comicModelType> => {
    const comic = {
      titulo: args.titulo,
      descripcion: args.descripcion,
      formato: args.formato,
    };
    const newcomic = await comicModel.create(comic);
    return newcomic;
  },
  deleteComic: async (
    _: unknown,
    args: { id: string }
  ): Promise<comicModelType> => {
    const comic = await comicModel.findByIdAndDelete(args.id);
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },
  updateComic: async (
    _: unknown,
    args: { id: string; titulo: string; descripcion: string; formato: string }
  ): Promise<comicModelType> => {
    const comic = await comicModel.findByIdAndUpdate(
      args.id,
      { titulo: args.titulo, descripcion: args.descripcion, formato: args.formato },
      { new: true, runValidators: true }
    );
    if (!comic) {
      throw new GraphQLError(`No comic found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return comic;
  },

  addUsuario: async (
    _: unknown,
    args: { nombre: string; correo: string }
  ): Promise<usuarioModelType> => {
    const coleccion = {
        nombre: "Coleccion "+ args.nombre,
        comics: [],
    }
    const newcol = await coleccionModel.create(coleccion)

    const usuario = {
      nombre: args.nombre,
      correo: args.correo,
      coleccion: newcol,
    };
    
    const newusuario = await usuarioModel.create(usuario);
    return newusuario;
  },

  deleteUsuario: async (
    _: unknown,
    args: { id: string }
  ): Promise<usuarioModelType> => {
    const usuario = await usuarioModel.findByIdAndDelete(args.id);
    if (!usuario) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    const coleccion = await coleccionModel.findByIdAndDelete(usuario.coleccion);
    if (!coleccion) {
        throw new GraphQLError(`No collection found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    return usuario;
  },

  updateuser: async (
    _: unknown,
    args: { id: string; nombre: string; correo: string }
  ): Promise<usuarioModelType> => {
    const usuario = await usuarioModel.findByIdAndUpdate(
      args.id,
      { nombre: args.nombre, correo: args.correo },
      { new: true, runValidators: true }
    );
    if (!usuario) {
      throw new GraphQLError(`No user found with id ${args.id}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return usuario;
  },

  addComictoColeccion: async (
    _: unknown,
    args: { comicid: string, collectionid: string }
  ): Promise<string> => {
    let coleccion = await coleccionModel.findById({_id:args.collectionid}).exec();
    let comic = await comicModel.findById({_id:args.comicid}).exec();

    if (!coleccion) {
      throw new GraphQLError(`No collection with id ${args.collectionid}`, {
        extensions: { code: "NOT_FOUND" },
      });
    }
    if (!comic) {
        throw new GraphQLError(`No comic with id ${args.comicid}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
    coleccion.comics.push(args.comicid);
    coleccion.save();
    return "Done";
  },
};