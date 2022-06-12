import { gql } from "@apollo/client";

export const CREATE_LEAD = gql`
  mutation createLead($data: LeadInput!) {
    createLead(data: $data) {
      data {
        id
      }
    }
  }
`;

export const UPDATE_LEAD = gql`
  mutation updateLead($id: ID!, $data: LeadInput!) {
    updateLead(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;

export const DELETE_LEAD = gql`
  mutation deleteLead($id: ID!) {
    deleteLead(id: $id) {
      data {
        id
      }
    }
  }
`;
