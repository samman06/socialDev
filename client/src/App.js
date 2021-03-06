import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import {clearCurrentProfile} from "./actions/profileActions";
import store from './store';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from "./components/dasboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-edit-profile/CreateProfile";
import EditProfile from "./components/create-edit-profile/EditProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Following from "./components/follow/Following";
import Followers from "./components/follow/Followers";
import UserPage from "./components/user-page/UserPage";
import CreateGroup from "./components/create-edit-group/CreateGroup";
import Groups from "./components/Groups/Groups";
import Group from "./components/Group/Group";
import GroupMembers from "./components/Group/GroupMembers";
import GroupManagers from "./components/Group/GroupManagers";
import GroupRequests from "./components/Group/GroupRequests";

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current Profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/feed" component={Posts}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/my-page" component={UserPage}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/following" component={Following}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/followers" component={Followers}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/post/:id" component={Post}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/profile/:handle" component={Profile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/profiles" component={Profiles}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/groups" component={Groups}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/groups/:id" component={Group}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/groups/:id/members" component={GroupMembers}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/groups/:id/managers" component={GroupManagers}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/groups/:id/requests" component={GroupRequests}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/create-group" component={CreateGroup}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/add-education" component={AddEducation}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                            </Switch>
                            <Route exact path="/not-found" component={NotFound}/>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
