import {gql} from 'apollo-server-express';

export default gql`
    
    type Query{
        hello:String!
    }

    type Mutation{
        working:String!
    }

    type Everyone{
        user: User!
        org: Org!
    }
`;