import { gql } from "@apollo/client";

export const leads = gql`
  {
    leads {
      data {
        id
        attributes {
          Name
          email
          Source
          Status
          Notes
        }
      }
    }
  }
`;
