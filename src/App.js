import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from './features/Authentication/Authentication';
import { selectAuthentication, setToken, removeToken } from './features/Authentication/AuthenticationSlice';
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
  const authState = useSelector(selectAuthentication);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(removeToken({token: ''}));
  };

  if(window.location.href.includes("access_token")) {
    let Url = window.location.href;
    let accessToken = Url.slice(Url.indexOf("=") + 1, Url.indexOf("&"));
    let expiresIn = parseInt(Url.slice(Url.indexOf("expires_in=") + 11, Url.slice(Url.indexOf("expires_in=") + 11).slice(0, Url.slice(Url.indexOf("expires_in=") + 11).indexOf("&")))) * 1000;
    window.setTimeout(() => accessToken = '', expiresIn);
    window.history.pushState('Access Token', null, '/');
    dispatch(setToken({token: accessToken}));
  };

  if(authState.accessToken) {
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
                        <li>
                            <button onClick={signOut}>Sign Out</button>
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
  return (
    <Router>
        <Redirect to="/signin" />
        <Switch>
            <Route path="/signin">
                <Authentication />
            </Route>
        </Switch>
    </Router>
  );
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