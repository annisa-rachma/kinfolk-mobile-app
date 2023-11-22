const { BASE_URL_USER } =  require("./url");
const axios = require('axios');
const redis = require("../config/redis");

const typeDefs = `#graphql

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
    users: [User]
    user(_id: ID!): User
  }

  input newUser {
    _id : ID
    username: String!
    email: String!
    role : String
    password : String
    phoneNumber : String
    address : String
  }

  type Mutation {
    addUser(user : newUser) : User 
    deleteUser(_id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
        try {
            const userCache = await redis.get("users")
            let response
            // console.log(userCache, "<<<")
            if(userCache) {
                response = JSON.parse(userCache)
            } else {
                const {data} = await axios({
                    url : BASE_URL_USER + '/users'
                }) 
                await redis.set("users", JSON.stringify(data))
                response = data
            }

            return response
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    user: async (_, args) => {
        try {
            const {_id} = args
            // console.log(_id)
            const {data} = await axios({
                url : BASE_URL_USER + `/users/${_id}`
            }) 
            return data
        } catch (err) {
            console.log(err)
            throw err
        }
    },
  },

  Mutation : {
    addUser: async (_, args) => {
        try {
            const {data} = await axios({
                url : BASE_URL_USER + '/users',
                method : 'post',
                data : args.user
            }) 
            await redis.del("users")
            return data.message
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    deleteUser:async (_, args) => {
        try {
            const {_id} = args
            const {data} = await axios({
                url : BASE_URL_USER + `/users/${_id}`,
                method : 'delete'
            }) 
            await redis.del("users")
            return data.message
        } catch (err) {
            console.log(err)
            throw err
        }
    },
  }
};

module.exports = { typeDefs, resolvers }