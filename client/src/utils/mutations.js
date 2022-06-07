import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  createUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      token
      user {
        _id
      }
}
}
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
}
`
export const CREATE_FLIGHT = gql`
mutation createFlight($origin: String!, $destination: String!, $flightNo: String!, $rego: String!, $deptTime: String, $arrTime: String) {
  createFlight(origin: $origin, destination: $destination, flightNo: $flightNo, rego: $rego, deptTime: $deptTime, arrTime: $arrTime) {
      _id
}
}
`;

export const DELETE_FLIGHT = gql`
mutation deleteFlight ($id: ID!) {
  deleteFlight(id: $id) {
       _id
  }
}
`;

export const CREATE_RESULT = gql`
mutation createResult($origin: String!, $destination: String!, $flightNo: String!, $rego: String!, $deptTime: String, $arrTime: String, $onGround: String, $onChocks: String, $gateClearance: String, $lirDelivered: String, $cargoDoorsClosed: String, $doorsClosed: String, $beaconsOn: String, $offChocks: String, $offGround: String, $username: String, $created_At: String) {
  createResult(origin: $origin, destination: $destination, flightNo: $flightNo, rego: $rego, deptTime: $deptTime, arrTime: $arrTime, onGround: $onGround, onChocks: $onChocks, gateClearance: $gateClearance, lirDelivered: $lirDelivered, cargoDoorsClosed: $cargoDoorsClosed , doorsClosed: $doorsClosed, beaconsOn: $beaconsOn, offChocks: $offChocks, offGround: $offGround, username: $username, created_At: $created_At) {
      _id
}
}
`;

export const DELETE_RESULT = gql`
mutation deleteResult ($id: ID!) {
  deleteResult(id: $id) {
       _id
  }
}
`;

