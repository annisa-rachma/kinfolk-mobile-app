const axios = require("axios");
const redis = require("../config/redis");
const { BASE_URL_PRODUCT, BASE_URL_USER } = require("./url");

const typeDefs = `#graphql

  type Product {
    id : ID
    name: String
    slug: String
    description : String
    price : Int
    mainImg : String
    categoryId : Int
    authorId : String
    Category : Category
    Images : [Image]
    User : User
  }

  type Category {
    id : ID
    name : String
  }

  type Image {
    id : ID
    productId : Int
    imgUrl : String
  }

  type User {
    _id : ID
    username: String
    email: String
    role : String
    password : String
    phoneNumber : String
    address : String
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  input newProduct {
    name: String!
    description : String!
    price : Int!
    mainImg : String!
    categoryId : Int!
  }

  input editProduct {
    name: String!
    description : String!
    price : Int!
    mainImg : String!
    categoryId : Int!
  }

  type Mutation {
    addProduct(product : newProduct ) : Product 
    deleteProduct(id: ID!): Product
    editProduct(product : editProduct, id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      try {
        const productsCache = await redis.get("products");
        let response;
        if (productsCache) {
          response = JSON.parse(productsCache);
        } else {
          const { data } = await axios({
            url: BASE_URL_PRODUCT + "/products",
          });
          await redis.set("products", JSON.stringify(data));
          response = data;
        }

        return response;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    product: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          url: BASE_URL_PRODUCT + `/products/${id}`,
        });
        const {data : user} = await axios({
          url : BASE_URL_USER + `/users/${data.authorId}`
        })
        data.User = user
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    addProduct: async (_, args) => {
      try {
        //   console.log(args, '<<<<args')
        const { data } = await axios({
          url: BASE_URL_PRODUCT + "/products",
          method: "post",
          data: args.product,
        });
        // console.log(data, '<<<')
        await redis.del("products")
        return data.message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    editProduct: async (_, args) => {
      try {
        const { product, id } = args;
        const { data } = await axios({
          url: BASE_URL_PRODUCT + `/products/${id}`,
          method: "put",
          data : product
        });
        await redis.del("products")
        return data.message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          url: BASE_URL_PRODUCT + `/products/${id}`,
          method: "delete",
        });
        await redis.del("products")
        return data.message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
