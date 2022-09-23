import {gql} from 'apollo-server-express';

export default gql`

    extend type Query{
        hello:String!
        event(id:ID!):Event!
        events:[Event!]!
    }

    extend type Mutation{

        addEvent(event:EventInput!):Event!
        updateEvent(id:ID!,event:EventInput!):Event!
        deleteEvent(id:ID!):Event!
        registerEvent(eventID:ID!, userID: ID!):User!
    }

    type Event{
        id:ID!
        name:String!
        description:String!
        date:String!
        time:String!
        venue:String!
        category:String!
        tags:[String]
        likes:Int
        comments:[Comment]
    }

    input EventInput{
        name:String!
        description:String!
        date:String!
        time:String!
        venue:String!
        category:String!
        tags:[String]
    }

    type newRegister{
        user:User!
        event:Event!
        time:String!
    }
`;