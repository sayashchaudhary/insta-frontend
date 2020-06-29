import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import CreatePost from "./components/CreatePost";
import "./App.css"

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
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
        </BrowserRouter>
    );
}

export default App;
