import {gql} from 'apollo-server-express';

export default gql`
    
    extend type Query{
        hello:String!
        org(id:ID!):Org!
        orgs:[Org!]!

    }

    extend type Mutation{
        working:String!
        addOrg(org:OrgInput!):Org!
        updateOrg(id:ID!,org:OrgInput!):Org!
        deleteOrg(id:ID!):Org!

    }

    type Org{
        id:ID!
        name:String!
        email:String!
        password:String
        avatar:String
        bio:String
        banner:String
        
    }

    input OrgInput{
        name:String!
        email:String!
        avatar:String
        bio:String
    }
`;