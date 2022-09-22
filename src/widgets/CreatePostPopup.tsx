import React, { useState, useEffect } from "react";
import { useMutation, gql } from '@apollo/client';

const CREATE_POST_DETAILS =  gql`
mutation createPost($title: String!, $description: String!, $location: String!) {
  createPost(
    postInput:{
        title: $title, description: $description, location: $location
    }
    ){
    _id
    title
    description
    location
  }
}
`;

function CreatePostPopup(props: any){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [addPost, { loading }] = useMutation(CREATE_POST_DETAILS, {
        update(
          _,result
        ) {
            console.log(result)
        },
        onError(err) {
          console.log(err);
        },
        variables: {
            title: title,
            description: description,
            location: location
        }
    });

    const handleChange = (e: any) => {
        let name = e.target.name;
        if(name === 'title') {
            setTitle(e.target.value);
        } else if(name === 'description') {
            setDescription(e.target.value);
        } else if (name === 'location') {
            setLocation(e.target.value);
        }
    }

    const handleSubmit = () => {
        addPost();
        props.closePopup();
    }

    const closePopup = () => {
        props.closePopup();
    }
    return (
        <div>
            <div className="create-popup">
                <div className="section is-fullheight">
                    <div className="container">
                        <div className="column is-6 is-offset-3">
                            <div className="box">
                                <h1>Create Post</h1>
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                    <input
                                        autoComplete="off"
                                        className={`input`}
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        value={title || ""}
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                    <input
                                        autoComplete="off"
                                        className={`input`}
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        value={description || ""}
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Location</label>
                                    <div className="control">
                                        <input
                                        className={`input`}
                                        type="text"
                                        name="location"
                                        onChange={handleChange}
                                        value={location || ""}
                                        required
                                        />
                                    </div>
                                </div>
                                <button className="button is-block is-info is-fullwidth" onClick={handleSubmit}>
                                    Add Post
                                </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="create-post-overlay" onClick={closePopup}></div>
        </div>
    );
}

export default CreatePostPopup;