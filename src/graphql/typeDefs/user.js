import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        hello:String!
        user(id:ID!):UserCard!
        users:[UserCard!]!
        authUser:User!
    }

    extend type Mutation{
        working(txt:Int!):String!
        registerNewUser(user: UserInput!): AuthResp!
        loginUser(user: UserInput!): User!
    }

    type User{
        id:ID!
        name:String!
        email:String!
        password:String
        avatar:String
        bio:String
        gender:String
        age:Int
        location:String
        phone:String
        organisation:String!
        events:[String]
        likes:[String]
        eventRegisted:[String]
    }

    type UserCard{
        id:ID!
        name:String!
        avatar:String!
        bio:String
    }

    type AuthResp{
        user: User!
        token:String!
    }

    input UserInput{
        email:String!
        password:String!
        name:String!
        avatar:String
        bio:String
        gender:String
        age:Int
        location:String
    }
`;
