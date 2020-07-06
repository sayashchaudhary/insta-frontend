import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../App"

const Profile = () => {

    const [profile, setProfile] = useState([]);

    const { state, dispatch } = useContext(userContext);

    useEffect(() => {
        fetch("http://localhost:8000/profile", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
            .then((result) => {
                console.log(result.user[0].followers)
                setProfile(result)
            })
    }, [])

    return (
        <div style={{ maxWidth: "70%", margin: "0px auto" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0",
                    borderBottom: "1px solid grey"
                }}
            >
                <div>
                    <img
                        style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                        src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
                <div>
                    <h4>{state ? state.name : "loading"}</h4>
                    <div
                        style={{ display: "flex", justifyContent: "space-between", width: "108%" }}
                    >
                        <h5>40 posts</h5>
                        <h5>40 followers</h5>
                        <h5>40 following</h5>
                    </div>
                </div>
            </div>
            {/*<div className="gallery">*/}
            {/*    {*/}
            {/*        profile.posts.map((item) => {*/}
            {/*            return (*/}
            {/*                <img className="item"*/}
            {/*                     src={item.photo}*/}
            {/*                     align={item.title}*/}
            {/*                />*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
};

export default Profile;
