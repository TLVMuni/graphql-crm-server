import _ from 'lodash';

const INITIAL_STATE = {
  loggedIn: false
  //authHeader: {},
  //authHeaderClosure: {}
};

const reducers = (state = INITIAL_STATE, action) => {

  switch( action.type ) {

    case 'LOGGED_IN':
      state = _.assign({}, state, {
                                    loggedIn: action.data.status,
                                    authHeaderClosure: action.data.getAuthHeaderClosure
                                  });
      break;

    default:
      break;

  }

  return state;

};

export default reducers;
