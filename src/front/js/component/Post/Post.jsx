import React, { useEffect, useContext, useState } from "react";
import "./post.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Pics

import Rigo from "../../../img/rigo-baby.jpg"

// Service 

import { getUsers } from "../../service/post.js";

// Component


const Post = (props) => {

    const [users, setUsers] = useState({})
    const date = new Date(props.date)

    const getUser = async (id) => {
		try {
			const res = await getUsers(id);
			const dataJSON = await res.json();
			setUsers(dataJSON)
		} catch (err) {
			console.log(err);
		}
	};

    useEffect(() => {
		getUser(props.user_id)
	}, [props.user_id])

    return (
        <div className="container-fluid p-0 mb-3">
            <div className="container-fluid bg-light d-flex justify-content-between align-items-center py-2 px-3">
                <Link className="d-flex username align-items-center m-0 text-color-black" to={`/user/${users.username}`}><img className="profile-pic-post me-2" src={users.img_url ? users.img_url : Rigo} alt="Profile-Pic" />{users.username}</Link>
                <p className="m-0 text-secondary">{`${date.getDate()} / ${date.getMonth() + 1}`}</p>
            </div>
            {
                props.img ? (
                    <div className="carousel-inner container-fluid p-0 ">
                        <img className="post-pic" src={props.img} alt="Post" />
                        <div className="px-2 games carousel-caption d-none d-md-block">
                            <h6>{`${props.game} / ${props.console}`}</h6>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid pt-2 pb-0 px-3 bg-light">
                        <h6 className="color-black m-0">{`${props.game} / ${props.console}`}</h6>
                    </div>
                )
            }

            <div className="container-fluid py-2 px-3 bg-light">
                {
                    props.img ? ( <p className="mb-2"><strong className="username">{users.username}</strong> {props.description}</p> )
                    : (<p className="mb-2">{props.description}</p>)
                }
                <p className="username">{props.tags.map((tag) => {
                    if (tag !== "") {
                        return `${tag} `
                    }
                }
                )}</p>
                <div className="container-fluid p-0 d-flex justify-content-between">
                    <div>
                        <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png" />
                        <Link to={`/post/${props.id}`}>
                            <img className="ps-2" src="https://img.icons8.com/fluency-systems-regular/30/000000/comments--v1.png" />
                        </Link>
                    </div>
                    <div>
                        <img src="https://img.icons8.com/material-outlined/30/000000/bookmark-ribbon--v1.png" />
                    </div>
                </div>
                {props.comment ? (
                    <div>
                    comentarios: ON
                    </div>) : null}
                
            </div>
        </div>
    )

}

Post.propTypes = {
    user_id: PropTypes.number,
    description: PropTypes.string,
    img: PropTypes.string,
    date: PropTypes.number,
    tags: PropTypes.array,
    game: PropTypes.string,
    console: PropTypes.string,
    comment: PropTypes.bool,
    id: PropTypes.id
}

export default Post;