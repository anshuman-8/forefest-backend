import {gql} from 'apollo-server-express';

export default gql`
    type Comment{
        id:ID!
        text:String!
        user:User!
        event:Event!
        time:String!
    }
`