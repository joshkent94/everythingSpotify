import React from 'react';
import { useSelector } from 'react-redux';
import Authentication from './features/Authentication/Authentication';
import { selectAuthentication } from './features/Authentication/AuthenticationSlice';
import Home from './components/Home';
import Subscriptions from './components/Subscriptions';
import Channel from './components/Channel';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from "react-router-dom";

export default function App() {
  const isAuthenticated = useSelector(selectAuthentication);

  if(isAuthenticated) {
    return (
      <Router>
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/subscriptions" activeClassName="active">Subscriptions</NavLink>
                    </li>
                    <li>
                        <NavLink to="/channel" activeClassName="active">Channel</NavLink>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/home">
                    <HomeRoutes />
                </Route>
                <Route path="/subscriptions">
                    <SubscriptionsRoutes />
                </Route>
                <Route path="/channel">
                    <ChannelRoutes />
                </Route>
            </Switch>
        </div>
      </Router>
    )
  };
  return <Authentication />;
};

function HomeRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Home />
              </Route>
          </Switch>
      </>
  )
};

function SubscriptionsRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Subscriptions />
              </Route>
          </Switch>
      </>
  )
};

function ChannelRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Channel />
              </Route>
          </Switch>
      </>
  )
};