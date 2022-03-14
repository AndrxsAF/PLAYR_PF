import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext.js";

// Service 

import { getUsers, deleteComment } from "../../service/post.js";

const Comment = (props) => {
    const [users, setUsers] = useState({})
    const { store, actions } = useContext(Context)

    const getUser = async (id) => {
		try {
			const res = await getUsers(id);
			const dataJSON = await res.json();
			setUsers(dataJSON)
		} catch (err) {
			console.log(err);
		}
	};

    const deleteComments = async () => {
        try {
            const body = {
                user_id: props.user_id,
                id: props.id
            }
			const res = await deleteComment(body);
            actions.handleRefresh()
		} catch (err) {
			console.log(err);
		}
    }


    useEffect(() => {
		getUser(props.user_id)
	}, [props.user_id])

    return (
        <li className="d-flex mb-1 d-flex justify-content-between">
            <p className="text-break m-0">
                <Link to={`/`} className="username text-color-black pe-2">{users.username}</Link>
                {props.description}
            </p>
            {props.valid || (props.token_id == props.user_id) ? (<button onClick={deleteComments} type="button" className="btn-close"/>) : null}
        </li>
                        
    )

}

Comment.propTypes = {
    user_id: PropTypes.number,
    description: PropTypes.string,
    valid: PropTypes.bool,
    id: PropTypes.number,
    token_id: PropTypes.number
}

export default Comment;