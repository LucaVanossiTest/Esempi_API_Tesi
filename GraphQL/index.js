const { ApolloServer, gql } = require('apollo-server');

// Dati in memoria per libri e autori
const libri = [
  { id: 1, titolo: "Il nome della rosa", idAutore: 1 },
  { id: 2, titolo: "Il giovane Holden", idAutore: 2 },
  { id: 3, titolo: "Il piccolo principe", idAutore: 3 }
];

const autori = [
  { id: 1, nome: "Umberto Eco" },
  { id: 2, nome: "J. D. Salinger" },
  { id: 3, nome: "Antoine de Saint-Exupèry" }
];

// Definizione dello schema GraphQL
const schemaLibri = gql`
  type Libro {
    id: ID!
    titolo: String!
    autore: autore!
  }

  type autore {
    id: ID!
    nome: String!
    libri: [Libro!]
  }

  type Query {
    libri: [Libro!]
    Libro(id: ID!): Libro
    autori: [autore!]
    autore(id: ID!): autore
  }

  type Mutation {
    addLibro(titolo: String!, idAutore: ID!): Libro
    addautore(nome: String!): autore
  }
`;

// Resolver per definire come recuperare i dati
const resolvers = {
  Query: {
    libri: () => libri,
    Libro: (_, { id }) => libri.find(Libro => Libro.id == id),
    autori: () => autori,
    autore: (_, { id }) => autori.find(autore => autore.id == id)
  },
  Libro: {
    autore: (Libro) => autori.find(autore => autore.id == Libro.idAutore)
  },
  autore: {
    libri: (autore) => libri.filter(Libro => Libro.idAutore == autore.id)
  },
  Mutation: {
    addLibro: (_, { titolo, idAutore }) => {
      const nuovoLibro = { id: libri.length + 1, titolo, idAutore };
      libri.push(nuovoLibro);
      return nuovoLibro;
    },
    addAutore: (_, { nome }) => {
      const nuovoAutore = { id: autori.length + 1, nome };
      autori.push(nuovoAutore);
      return nuovoAutore;
    }
  }
};

// Creazione del server Apollo
const server = new ApolloServer({ schemaLibri, resolvers });

// Avvio del server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});