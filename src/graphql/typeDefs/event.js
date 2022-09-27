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

  enum categoryType{
    virtualMeetup
    liveMeetup
    party
    discussion
    science
    technology
    arts
    music
    sports
    health
    food
    travel
    photography
    business
    finance
    marketing
    entrepreneurship
    career
    spirituality
    history
    culture
    other
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    banner: String
    createdAt: String
    creator: User!
    dateTime: String!
    venue: String!
    price: Int!
    location: String
    category: categoryType!
    tags: [String]
    likes: [User]
    comments: [Comment!]
    registrations: [User!]
    registrationLimit: Int!
  }

  input EventInput {
    title: String!
    description: String!
    dateTime: String
    venue: String!
    location: String
    category: categoryType!
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
