import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Stage 1 - Authentication
// Build a PrivateRoute component and use it to protect a route that renders the BubblesPage component
const PrivateRoute = ({ component: Component, ...props }) => {
  return (
    <>
      <Route
        {...props}
        render={() => {
          if (localStorage.getItem('token')) {
            return <Component />;
          } else {
            return <Redirect to='/Login' />;
          }
        }}
      />
    </>
  );
};

export default PrivateRoute;