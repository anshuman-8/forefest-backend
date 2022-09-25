import { gql } from "apollo-server-express";

export default gql`
  # extend type Query{
  #     # hello:String!
  #     # event(id:ID!):Event!
  #     # events:[Event!]!
  # }

  extend type Mutation {
    createEvent(event: EventInput!): newRegister!
    # updateEvent(id:ID!,event:EventInput!):Event!
    # deleteEvent(id:ID!):Event!
    registerEvent(eventID: ID!): User!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    banner: String
    createdAt: String
    date: String!
    dateTime: String!
    venue: String!
    price: Int!
    category: String!
    tags: [String]
    likes: Int
    comments: [Comment]
  }

  input EventInput {
    title: String!
    description: String!
    date: String!
    dateTime: String
    venue: String!
    category: String!
    price: Int!
    tags: [String]
  }

  type newRegister {
    user: User!
    event: Event!
    time: String!
  }

  
`;
