import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
import { useQuery } from 'react-apollo-hooks';

import { GET_CURRENT_USER } from 'graphql/auth';
import { PrivateRoute } from 'utils/HOCs/PrivateRoute/PrivateRoute';
import Auth from 'components/pages/Auth/Auth';
import Dashboard from 'components/pages/Dashboard/Dashboard';
import Error404 from 'components/pages/Error/Error404';

const App = () => {
  const setUser = useStoreActions(actions => actions.user.setUser);

  const { data, loading } = useQuery(GET_CURRENT_USER);
  if (loading) {
    return <div />;
  }
  if (data.getCurrentUser && data.getCurrentUser.user && data.getCurrentUser.user.id) {
    const { __typename, ...userData } = data.getCurrentUser.user;
    setUser(userData);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/authenticate' component={Auth} />
        <Route exact path='/' render={() => <Redirect to='/app/posts' />} />
        <PrivateRoute path='/app' component={Dashboard} />
        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default App;
