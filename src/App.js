import React from 'react';
import { useSelector } from 'react-redux';
import AuthenticatedApp from './components/AuthenticatedApp';
import Authentication from './features/Authentication/Authentication';
import { selectAuthentication } from './features/Authentication/AuthenticationSlice';

function App() {
  const isAuthenticated = useSelector(selectAuthentication);
  if(isAuthenticated) {
    return <AuthenticatedApp />;
  };
  return <Authentication />;
}

export default App;