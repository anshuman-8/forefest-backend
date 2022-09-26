import { gql } from "apollo-server-express";

export default gql`
  extend type Query{
      # hello:String!
      event(eventID:ID!):Event!
      events:[Event!]!
  }

  extend type Mutation {
    createEvent(event: EventInput!): eventResponse!
    likeAnEvent(eventID: ID!): eventResponse
    unlikeAnEvent(eventID: ID!): eventResponse
    # updateEvent(id:ID!,event:EventInput!):Event!
    # deleteEvent(id:ID!):Event!
    commentOnEvent(eventID: ID!, text: String!): eventResponse!
    registerEvent(eventID: ID!): eventResponse!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    banner: String
    createdAt: String
    creator: User!
    date: String!
    dateTime: String!
    venue: String!
    price: Int!
    category: String!
    tags: [String]
    likes: [User]
    comments: [Comment!]
    registrations: [User!]
    registrationLimit: Int!
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
    registrationLimit: Int!
  }

  type eventResponse {
    user: User!
    event: Event!
  }
  
  type Comment { 
    text: String!
    createdAt: String!
    user: User!
    event: Event!
  }
  
`;
