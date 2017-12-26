import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import { graphiqlExpress } from 'graphql-server';
import cors from 'cors';

import { schema } from './schemas/schema';

const app = express();
app.use('*', cors({ origin: '*' }));

// 'context' is optional parameter passed to graphqlHTTP middleware.
// According to express-graphql GitHub repository documentation (https://github.com/graphql/express-graphql#options)
// this parameter is arbitrary value passed to resolvers.
// The most important part of this invokation is following statement:
// "If <i>context<i> is nor provided, the <i>request</i> object is passed as the context.
//
// So because we don't touch 'context' object here, inside resolvers we get the request as third
// parameter - named context
app.use('/graphql',
        bodyParser.json(),
        graphqlHTTP({ schema: schema }));

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`GraphQL Server is listening on: ${PORT}`);
});
