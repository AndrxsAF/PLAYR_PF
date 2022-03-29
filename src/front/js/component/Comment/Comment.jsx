import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext.js";
import "./comment.css"

// Service 
import { deleteComment } from "../../service/post.js";

const Comment = (props) => {
    const { actions } = useContext(Context)

    const deleteComments = async () => {
        try {
            const body = {
                user_id: props.comment.user.id,
                id: props.comment.id
            }
			const res = await deleteComment(body);
            actions.handleRefresh()
		} catch (err) {
			console.log(err);
		}
    }

    return (
        <li className="d-flex mb-1 d-flex justify-content-between">
            <div className="d-flex">
                <Link to={`/user/${props.comment.user.username}`} className="me-2"><img className="profile-pic-comment" src={props.comment.user.img_url} alt="profile pic" /></Link>
                <p className="text-break m-0">
                    <Link to={`/user/${props.comment.user.username}`} className="username text-color-black pe-2">{props.comment.user.username}</Link>
                    {props.comment.description}
                </p>    
            </div>
            
            {props.valid || (props.token_id == props.comment.user.id) ? (<button onClick={deleteComments} type="button" className="btn-close"/>) : null}
        </li>
                        
    )

}

Comment.propTypes = {
    valid: PropTypes.bool,
    token_id: PropTypes.number,
    comment: PropTypes.object
}

export default Comment;