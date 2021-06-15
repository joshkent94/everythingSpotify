import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Authentication from './features/Authentication/Authentication';
import { selectAccessToken, setToken, removeToken } from './features/Authentication/AuthenticationSlice';
import Music from './components/Music/Music';
import Playlists from './components/Playlists/Playlists';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import Search from './features/Search/Search';
import Loading from './components/Loading/loading';
import Error from './components/Error/error';
import { selectIsRejected } from './features/Search/SearchSlice';

export default function App() {
  const accessToken = useSelector(selectAccessToken);
  const isRejected = useSelector(selectIsRejected);
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

  if(accessToken) {

    if(isRejected) {
        return (
            <Router>
                <Redirect to="/error" />
                <Switch>
                    <Route path="/error">
                        <Error />
                    </Route>
                </Switch>
            </Router>
        );
    };

    return (
        <div id="main">
            <Loading />
            <Router>
                <div className="nav-div">
                    <nav className="nav-links">
                        <ul>
                            <li>
                                <NavLink to="/music" activeClassName="active">Music</NavLink>
                            </li>
                            <li>
                                <NavLink to="/playlists" activeClassName="active">Playlists</NavLink>
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
                        <Music />
                    </Route>
                    <Route path="/account">
                        <Playlists />
                    </Route>
                </Switch>
                <Redirect to="/music" />
            </Router>
        </div>
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