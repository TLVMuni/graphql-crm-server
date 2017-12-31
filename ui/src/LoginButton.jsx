import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import moment from 'moment';


const SAFETY_TIME = 10;

class LoginButton extends React.Component{

  constructor(props){

    super(props);

    this.state = {
        loginStatus: false,
        buttonDisabled: '',
        loading: false
    }

    this.jwt = null;
    this.tokenExpire = null;

    this.buttonHandler = this.buttonHandler.bind(this);
    this.getAuthorizationHeader = this.getAuthorizationHeader.bind(this);
  }

  componentDidMount(){

    var self = this;

    window.addEventListener("message", (event) => {
        if( event.data.access_token ) {
            self.jwt = event.data;
            self.tokenExpire = jwtDecode(event.data.access_token).exp;
            self.setState({
              loginStatus: true,
              buttonDisabled: '',
              loading: false
            });
            self.props.onStatusChange(true);
        }
      }, false);
  }

  getAuthorizationHeader(){
    if (this.jwt) {
      var time = moment().unix();
        if (time < this.tokenExpire - SAFETY_TIME) {
            return this.jwt.token_type + ' ' + this.jwt.access_token;
        }  else { //token expired
          return null;
        }
    }
    return null;
  }

  buttonHandler(e) {
      if (!this.state.loginStatus) {
          this.setState({
              loading: true,
              buttonDisabled: 'disabled'
          });
          window.open('https://tlvauth.azurewebsites.net/logintoken.html', '_blank' ,false);
      }
      else {
          //log out
            this.jwt = null;
            this.tokenExpire = null;
            this.setState({
                loginStatus: false
            });
            this.props.onStatusChange(false);

      }

  }


  render(){

    const loaderClass = classNames('fa',
        { 'fa-spinner': this.state.loading },
        { 'fa-spin': this.state.loading });


    return(
        <button className={this.props.className}
                onClick={this.buttonHandler}
                disabled={this.state.buttonDisabled}>
            <span className="spanBtnText">{this.props.text}</span>
            <span className="spinner"><i className={loaderClass}></i></span>
        </button>
    );
  }
}
LoginButton.propTypes = {
  onStatusChange: PropTypes.func.isRequired
};

LoginButton.defaultProps = {
  text: 'Log In',
  className: "btn btn-primary btn-lg"
};

export default LoginButton;
