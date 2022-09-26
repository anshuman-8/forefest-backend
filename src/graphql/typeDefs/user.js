import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        hello:String!
        user(id:ID!):User!
        users:[User!]!
        authUser:User!
        loginUser(email: String!, password: String!): AuthResp!
    }

    extend type Mutation{
        working(txt:Int!):String!
        registerNewUser(user: UserInput!): AuthResp!
        updateUser(id:ID!,user: UserInput!): UserCard! # for bio, avatar, name, phoneno, gender, age, location, organisation, events, likes, eventRegisted
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
        isOrg:Boolean
        location:String
        phone:String
        organisation:[Org!]
        events:[Event!]
        likes:[Event]
        eventRegisted:[Event]
        following:[Everyone]
        followers:[User!]
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
