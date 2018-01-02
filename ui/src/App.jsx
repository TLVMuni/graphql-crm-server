/* @flow */
import React, { Component } from 'react';

import Header from './Header';
import Explorer from './Explorer';

class App extends React.Component<{}>{

  render() {
    return (<span>
              <Header text='Start exploring GraphQL API queries using your Digitel account now ' />
              <Explorer />
            </span>
           );
  }

}

export default App;
