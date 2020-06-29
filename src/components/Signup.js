import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = () => {

    const history = useHistory()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postData = () => {
        fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error })
                } else {
                    M.toast({ html: data.message })
                    history.push("/login")
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
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
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
                    SignUp
                </button>
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
};

export default Signup;
