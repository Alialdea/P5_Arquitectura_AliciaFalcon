// The GraphQL schema
export const typeDefs = `#graphql
 type Comic {
    id: String!
    titulo: String!
    descripcion: String!
    formato: String!
  }

 type Usuario {
    id: String!
    nombre: String!
    correo: String!
    coleccion: Coleccion!
  }

 type Coleccion {
    id: String!
    nombre: String!
    comics: [Comic!]!
 }


  type Query {
    comics: [Comic!]!
    comic(id: ID!): comic!
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario!
  }

  type Mutation {
    addComic(titulo: String!, descripcion: String!, formato: String!): Comic!
    deleteComic(id: ID!): Comic!
    updateComic(id: ID!, titulo: String, descripcion: String, formato: String): Comic!
    addUsuario(nombre: String!, correo: String!): Usuario!
    deleteUsuario(id: ID!): Usuario!
    updateUsuario(id: ID!, nombre: String, correo: String): Usuario!
    addComictoColeccion(comicid: ID!, coleccionid: ID!): String!
    
  }
`;