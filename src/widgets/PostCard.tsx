import React from "react";
import { useNavigate } from "react-router-dom";

function PostCard(props: any){
    const navigate  = useNavigate();
    return (
        <div className="styleCard">
            <div className="styleCardContent">
                <p className="styleCardTitle">{props.post.title}</p>
                <p className="styleLocationLabel">{props.post.location}</p>
                <p className="styleDescription">{props.post.description}</p>
            </div>
        </div>
    );
}

export default PostCard;