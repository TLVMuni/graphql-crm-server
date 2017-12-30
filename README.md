# GraphQL Server for Tel-Aviv Municipal CRM [![Build Status](https://travis-ci.org/TLVMuni/graphql-crm-server.svg?branch=master)](https://travis-ci.org/TLVMuni/graphql-crm-server)
<b>This a production repository. Be careful to update the master branch of this repository because it is published as deployment source for Azure App Service https://tlvgraphql.azurewebsites.net</b>

## Notes on hosting
On Azure this site is hosted under IIS with iisnode. By default, <i>iisnode</i> ignores scripts in <i>package.json</i> assumes the main entry point to the site to be "server.js" as specified in web.config.
