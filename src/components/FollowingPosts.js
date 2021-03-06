import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App"

const FollowingPosts = () => {

    const [data, setData] = useState([]);

    const { state, dispatch } = useContext(userContext)

    useEffect(() => {
        fetch("http://localhost:8000/following/posts", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
            .then((result) => {
                setData(result.posts)
            })
    }, [])

    const likePost = (id) => {
        fetch("http://localhost:8000/like", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch((err) => {
            console.log(err)
        })
    }
    const unlikePost = (id) => {
        fetch("http://localhost:8000/unlike", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch((err) => {
            console.log(err)
        })
    }

    const makeComment = (text, postId) => {
        fetch("http://localhost:8000/comment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then((res) => res.json())
            .then((result) => {
                console.log(result)
                const newData = data.map((item) => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch((err) => {
            console.log(err)
        })
    }

    const deletePost = (postId) => {
        fetch(`http://localhost:8000/deletepost/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.filter((item) => {
                    return item._id !== result._id
                })
                setData(newData)
            })
    }

    return (
        <div className="home">
            {
                data.map((item) => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>
                                <Link to={item.postedBy._id !== state._id
                                    ? `/profile/${item.postedBy._id}`
                                    : '/profile'
                                }
                                >
                                    {item.postedBy.name}
                                </Link>
                                {item.postedBy._id === state._id &&
                                <i
                                    className="material-icons"
                                    style={{ float: "right" }}
                                    onClick={() => deletePost(item._id)}
                                >
                                    delete
                                </i>}
                            </h5>
                            <div className="card-image">
                                <img
                                    src={item.photo}
                                />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons"
                                       onClick={() => {
                                           unlikePost(item._id)
                                       }}
                                    >
                                        thumb_down
                                    </i>
                                    :
                                    <i className="material-icons"
                                       onClick={() => {
                                           likePost(item._id)
                                       }}
                                    >
                                        thumb_up
                                    </i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map((comment) => {
                                        return (
                                            <p style={{ fontWeight: "900" }}>
                                                {/*<span style={{ fontWeight: "500" }}>*/}
                                                {/*    {comment.postedBy.name}*/}
                                                {/*</span>*/}
                                                {comment.text}
                                            </p>
                                        )
                                    })
                                }
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                    makeComment(event.target[0].value, item._id)
                                }}>
                                    <input
                                        type="text"
                                        placeholder="Add comment"
                                    />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default FollowingPosts;
