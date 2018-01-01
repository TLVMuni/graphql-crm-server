// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import GraphiQL from 'graphiql';
import classnames from 'classnames';

type Props = {
  enabled: Boolean,
  fetcher:() => void,
}

class Explorer extends React.Component<Props> {

  constructor(props) {

    super(props);

    this.state = {

      // REQUIRED for GraphiQL:
      // `fetcher` must be provided in order for GraphiQL to operate
      fetcher: this.props.fetcher,

      // OPTIONAL PARAMETERS
      // GraphQL artifacts
      query: '',
      variables: '',
      response: '',

      // GraphQL Schema
      // If `undefined` is provided, an introspection query is executed
      // using the fetcher.
      schema: undefined,

      // Useful to determine which operation to run
      // when there are multiple of them.
      operationName: null,
      storage: null,
      defaultQuery: null,

      // Custom Event Handlers
      onEditQuery: null,
      onEditVariables: null,
      onEditOperationName: null,

      // GraphiQL automatically fills in leaf nodes when the query
      // does not provide them. Change this if your GraphQL Definitions
      // should behave differently than what's defined here:
      // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
      getDefaultFieldNames: null,

    }

    this.graphQLFetcher = this.graphQLFetcher.bind(this);

  }

  handleClickPrettifyButton(event) {
    const editor = this.graphiql.getQueryEditor();
    const currentText = editor.getValue();
    const { parse, print } = require('graphql');
    const prettyText = print(parse(currentText));
    editor.setValue(prettyText);
  }

  graphQLFetcher(graphQLParams) {

    if( !this.props.authHeaderClosure )
      return;

    const authHeader = this.props.authHeaderClosure();

    //return fetch('http://localhost:3001/graphql?', {
    return fetch('https://tlvgraphql.azurewebsites.net/graphql?', {
      method: 'post',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': authHeader// 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzMTMwNjk0ODYiLCJuYmYiOjE1MTQzMDgzODcsImV4cCI6MTUxNDM5NDc4NywiaWF0IjoxNTE0MzA4Mzg3LCJpc3MiOiJ1cm46dGVsLWF2aXY6YXBpIiwiYXVkIjoiZGlnaXRlbCJ9.OsRjCkRX_momn7N9gIZSBiJgGq0pwz_4o1uJvP9qowI'
               },
      body: JSON.stringify(graphQLParams)
    }).then(response => {
      return response.json()
    });

  }

  render() {

    let explorerClass = classnames({
        'graphiql-ide': true,
        'signed-out' : !this.props.enabled
    })

    return(<div className={explorerClass}>
            <GraphiQL schema={null}
                      ref={c => { this.graphiql = c; }} {...this.state}
                      fetcher={this.graphQLFetcher}
                      editorTheme="material">
               <GraphiQL.Logo>TLV Graph<em>i</em>QL</GraphiQL.Logo>
              <GraphiQL.Toolbar>
                  <GraphiQL.Button
                    onClick={this.handleClickPrettifyButton}
                    label="Prettify"
                    title="Prettify Query"
                  />
              </GraphiQL.Toolbar>
            </GraphiQL>
      </div>);
  }

};


function mapStateToProps(state) {
  return {
    enabled: state.loggedIn,
    //authHeader: state.authHeader,
    authHeaderClosure: state.authHeaderClosure
  };
};

export default connect(mapStateToProps)(Explorer);
