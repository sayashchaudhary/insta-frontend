import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="my-card">
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button className="btn waves-effect waves-light login-button">
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
