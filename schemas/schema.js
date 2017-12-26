import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers.js';

const typeDefs = `

type Customer {
    id: ID!
    firstName: String
    lastName: String
    email: String
    birthDate: String #Date
    age: Int
    digitelCardNumber: String
    digitelCardType: String
    mobilePhoneNumber: String
    phoneNumber: String
    SMSOk: Boolean
}

# This type specifies the entry points into our API.
type Query {
    customers: [Customer]
    customer(id: String): Customer
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
