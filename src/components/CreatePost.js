import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const CreatePost = () => {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        if (photo) {
            fetch("http://localhost:8000/createpost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    photo
                })
            }).then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({ html: data.error })
                    } else {
                        M.toast({ html: "Created post successfully" })
                        history.push("/")
                    }
                }).catch((err) => {
                console.log(err);
            })
        }
    }, [photo])

    const postData = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instagram-clone");
        data.append("cloud_name", "sayashchaudhary");
        fetch("https://api.cloudinary.com/v1_1/sayashchaudhary/image/upload", {
            method: "POST",
            body: data
        }).then((res) => res.json())
            .then((data) => {
                setPhoto(data.url)
            }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div
            className="card"
            style={{
                margin: "10px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input
                        type="file"
                        onChange={(event) => setImage(event.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button
                className="btn waves-effect waves-light login-button"
                onClick={postData}
            >
                Create Post
            </button>
        </div>
    )
}

export default CreatePost;
