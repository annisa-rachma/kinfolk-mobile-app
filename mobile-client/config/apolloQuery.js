import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query Products {
    products {
      id
      name
      price
      mainImg
      Category {
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query Products($productId: ID!) {
    product(id: $productId) {
      id
      name
      slug
      description
      price
      mainImg
      categoryId
      authorId
      Category {
        name
      }
      Images {
        imgUrl
      }
      User {
        email
      }
    }
  }
`;
