import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            _id
            firstName
            lastName
            email
            username
        }
    }
`;

export const QUERY_FLIGHTS = gql`
    {
        flights {
            _id
            origin
            destination
            flightNo
            rego
            deptTime
            arrTime
        }
    }
`;

export const QUERY_SINGLE_FLIGHT = gql`
query flight($_id: ID){
    flight(_id: $_id) {
    _id
    deptTime
    arrTime
    flightNo
    rego
    destination
    origin
  }
}
`;

export const QUERY_SINGLE_RESULT = gql`
query result($_id: ID!){
    result(_id: $_id) {
    _id
    deptTime
    arrTime
    flightNo
    rego
    destination
    origin
    onGround
    onChocks
    gateClearance
    lirDelivered
    cargoDoorsClosed
    doorsClosed
    beaconsOn
    offChocks
    offGround
    createdAt
  }
}
`;

export const QUERY_RESULTS_BY_USER = gql`
query resultByUser($username: String){
    resultByUser(username: $username) {
    _id
    deptTime
    arrTime
    flightNo
    rego
    destination
    origin
    onGround
    onChocks
    gateClearance
    lirDelivered
    cargoDoorsClosed
    doorsClosed
    beaconsOn
    offChocks
    offGround
    createdAt
  }
}
`;
