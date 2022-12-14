import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        hello:String!
        user(id:ID!):User!
        users:[User!]!
        authUser:User
        loginUser(email: String!, password: String!): AuthResp!
    }

    extend type Mutation{
        working(txt:Int!):String!
        registerNewUser(user: UserInput!): AuthResp!
        updateUser(user: UserInput!): User!
    }

    type User{
        id:ID!
        name:String
        email:String
        # password:String
        avatar:String
        bio:String
        gender:String 
        age:Int
        isOrg:Boolean
        location:String
        organisation:[Org!]
        events:[Event!]
        likes:[Event!]
        eventRegisted:[Event!]
        following:[Everyone]
        followers:[User!]
        phone:String
    }

    type UserCard{
        id:ID!
        name:String!
        avatar:String!
        bio:String
    }

    enum GenderType{
        MALE
        FEMALE
        TRANS
        NONE
        OTHERS
    }

    type AuthResp{
        user: User!
        token:String!
    }

    input UserInput{
        email:String
        password:String
        name:String
        avatar:String
        bio:String
        gender: GenderType
        age:Int
        location:String
        phone:String
        isOrg:Boolean
    }
`;
