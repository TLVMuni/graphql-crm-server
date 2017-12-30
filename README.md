# GraphQL Server for Tel-Aviv Municipal CRM [![Build Status](https://travis-ci.org/TLVMuni/graphql-crm-server.svg?branch=master)](https://travis-ci.org/TLVMuni/graphql-crm-server)
<b>This a production repository. Be careful to update the master branch of this repository because it is published as deployment source for Azure App Service https://tlvgraphql.azurewebsites.net</b>

## Notes on hosting
On Azure this site is hosted under IIS with iisnode. By default, <i>iisnode</i> ignores scripts in <i>package.json</i> and assumes the main entry point to the site is <i>server.js</i> as specified in <i>web.config</i>. According to this defaults, <i>server.js</i> of this project serves as a hook to run JS code within babel. This configuration is mirrored in included package.json and could be used for local runs:
<code>npm run start</code>
The actual code for the site is inside App.js.
