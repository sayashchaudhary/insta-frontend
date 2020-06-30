import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import "./App.css";
import { UserReducer, initialSate } from "./reducers/UserReducer";

export const userContext = createContext();

const Routing = () => {

    const history = useHistory();
    const { state, dispatch } = useContext(userContext)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({ type: "USER", payload: user })
        } else {
            history.push("/login")
        }
    }, [])

    return (
        <Switch>
            <Route exact path='/'>
                <Home/>
            </Route>
            <Route path='/signup'>
                <Signup/>
            </Route>
            <Route path='/login'>
                <Login/>
            </Route>
            <Route path='/profile'>
                <Profile/>
            </Route>
            <Route path='/createpost'>
                <CreatePost/>
            </Route>
        </Switch>
    )
}

const App = () => {

    const [state, dispatch] = useReducer(UserReducer, initialSate);

    return (
        <userContext.Provider value={{ state, dispatch }}>
            <BrowserRouter>
                <Navbar/>
                <Routing/>
            </BrowserRouter>
        </userContext.Provider>
    );
}

export default App;
