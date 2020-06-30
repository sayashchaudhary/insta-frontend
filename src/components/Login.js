import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { userContext } from "../App"

const Login = () => {

    const { state, dispatch } = useContext(userContext);

    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postData = () => {
        fetch("http://localhost:8000/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error })
                } else {
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: 'USER', payload: data.user })
                    M.toast({ html: "Signed in successfully" })
                    history.push("/")
                }
            }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button
                    className="btn waves-effect waves-light login-button"
                    onClick={postData}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
};

export default Login;
