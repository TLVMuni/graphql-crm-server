import rp from 'request-promise';

export const resolvers = {
  Query: {
    customer: (root, args, context) => {

        // 'context' is optional parameter passed to graphqlHTTP middleware.
        // According to express-graphql GitHub repository documentation (https://github.com/graphql/express-graphql#options)
        // this parameter is arbitrary value passed to resolvers.
        // The most important part of this invokation is following statement:
        // "If <i>context<i> is nor provided, the <i>request</i> object is passed as the context.
        //
        // So because we din't touched 'context' object on Express, we get it here as the request
        // parameter - named context
        const authHeader = context.headers.authorization;

        const customerId = args.id;
        const url = 'https://api.tel-aviv.gov.il/crm/customer/' + customerId;

        // Promise returned to GraphQL includes .then section.
        // Any 'mapping' between API result and published schema should occur these
        return rp({
            uri: url,
            headers: {
                'User-Agent': 'GraphiQL',
                'Authorization': authHeader
            },
            json: true})
            .then( res => {
                // Any mapping could be performed here. In this particular case,
                // the mapping is simple as gowing down one hierarchy level.
                return res.customer;
            });
    }
  }
};
