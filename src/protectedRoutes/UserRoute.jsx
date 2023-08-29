import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router';

import { AuthContext } from '../auth/AuthProvider';

const UserRoute = ({path, Component}) => {

    const { authState } = useContext(AuthContext);

    return (
        <Route 
          exact path={path}
          render={() =>
            authState.isLoggedIn ?
              <Component />
            :
              <Redirect to='/login' />
          }
        />
    )
}

export default UserRoute;

