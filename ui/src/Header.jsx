// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import LoginButton from './LoginButton';

type Props = {
  text: string,
};

type State = {
  loggedIn: Boolean
}

class Header extends React.Component<Props, State> {

  constructor(props) {

    super(props);

    this.state = {
      loggedIn: false,
      loginStatus: "Log In"
    }

    this.loginButton = {};

    this.loginStatusChanged = this.loginStatusChanged.bind(this);
  }

  loginStatusChanged(status) {

    const closure = this.loginButton.getAuthorizationHeader;
    const logText = status ? 'Log Out' : 'Log In';

    this.setState({
      loggedIn: status,
      loginStatus: logText
    });

    this.props.dispatch({
      type: 'LOGGED_IN',
      data: {
          status: status,
          getAuthHeaderClosure: closure
        }
    });

  }

  render() {

    return (<div>
              <div className='header TableObject'>
                <div className='TableObject-item'>
                  <h3>TLV GraphQL API</h3>
                </div>
                <div className='TableObject-item text-right'>
                  <span>{this.props.text}</span>
                  <LoginButton text={this.state.loginStatus}
                      ref={ c => { this.loginButton = c; }}
                      onStatusChange={this.loginStatusChanged} />
                </div>
              </div>
              <div className='Box-row Box-row-yellow'>
                <strong>Heads up!</strong>&nbsp;
                TLV GraphQL Explorer makes use of
                <strong>real, live, production data</strong>
              </div>
            </div>
      );
  }

};

export default connect()(Header);
