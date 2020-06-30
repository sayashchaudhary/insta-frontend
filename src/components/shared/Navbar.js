import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../App";

const Navbar = () => {

    const history = useHistory()

    const { state, dispatch } = useContext(userContext);

    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li>
                    <button
                        className="btn waves-effect waves-light login-button"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" })
                            history.push("/login")
                        }}
                    >
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div
                className="nav-wrapper white">
                <Link to={state ? "/" : "/login"} className="brand-logo left">Instagram</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
