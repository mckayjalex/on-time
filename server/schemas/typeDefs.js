const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    username: String
    password: String

  }
  
  type Result {
    _id: ID
    origin: String
    destination: String
    flightNo: String
    rego: String
    deptTime: String
    arrTime: String
    onGround: String
    onChocks: String
    gateClearance: String
    lirDelivered: String
    cargoDoorsClosed: String
    doorsClosed: String
    beaconsOn: String
    offChocks: String
    offGround: String
    username: String
    createdAt: String
  }

  type Flight {
    _id: ID
    origin: String
    destination: String
    flightNo: String
    rego: String
    deptTime: String
    arrTime: String
  }
  type Auth {
    token: ID
    user: User
  }


  type Query {
    user: User
    flights: [Flight]
    flight(_id: ID): Flight
    results: [Result]
    result(_id: ID!): Result
    resultByUser(username: String): [Result]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String! ): Auth
    login(username: String!, password: String!): Auth
    createFlight(origin: String!, destination: String!, flightNo: String!, rego: String!, deptTime: String, arrTime: String): Flight
    deleteFlight(id: ID!): Flight
    createResult(origin: String!, destination: String!, flightNo: String!, rego: String!, deptTime: String, arrTime: String, onGround: String, onChocks: String, gateClearance: String, lirDelivered: String, cargoDoorsClosed: String, doorsClosed: String, beaconsOn: String, offChocks: String, offGround: String, username: String, created_At: String): Result
    deleteResult(id: ID!): Result
  }
`;

module.exports = typeDefs;