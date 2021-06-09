import React from 'react';
import { useSelector } from 'react-redux';
import Authentication from './features/Authentication/Authentication';
import { selectAuthentication } from './features/Authentication/AuthenticationSlice';
import Music from './components/Music/Music';
import Podcasts from './components/Podcasts/Podcasts';
import Account from './components/Account/Account';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import Search from './features/Search/Search';

export default function App() {
  const isAuthenticated = useSelector(selectAuthentication);

  if(isAuthenticated) {
    return (
        <Router>
            <div className="nav-div">
                <nav className="nav-links">
                    <ul>
                        <li>
                            <NavLink to="/music" activeClassName="active">Music</NavLink>
                        </li>
                        <li>
                            <NavLink to="/podcasts" activeClassName="active">Podcasts</NavLink>
                        </li>
                        <li>
                            <NavLink to="/account" activeClassName="active">Account</NavLink>
                        </li>
                    </ul>
                </nav>

                <div className="nav-search">
                    <Search />
                </div>
            </div>
            <Switch>
                <Route path="/music">
                    <MusicRoutes />
                </Route>
                <Route path="/podcasts">
                    <PodcastsRoutes />
                </Route>
                <Route path="/account">
                    <AccountRoutes />
                </Route>
            </Switch>
            <Redirect to="/music" />
        </Router>
    )
  };
  return <Authentication />;
};

function MusicRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Music />
              </Route>
          </Switch>
      </>
  )
};

function PodcastsRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Podcasts />
              </Route>
          </Switch>
      </>
  )
};

function AccountRoutes() {
  let match = useRouteMatch();

  return (
      <>
          <Switch>
              <Route path={`${match.path}`}>
                  <Account />
              </Route>
          </Switch>
      </>
  )
};