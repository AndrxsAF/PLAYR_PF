import React from "react";
import "./post.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Pics

import Rigo from "../../../img/rigo-baby.jpg"
import PostPic from "../../../img/pokémon-legends-arceus.jpg"

// Service 

// Component


const Post = (props) => {

    return (
        <div className="container-fluid p-0 mb-3">
            <div className="container-fluid bg-light d-flex justify-content-between align-items-center py-2 px-3">
                <p className="d-flex username align-items-center m-0"><img className="profile-pic-post me-2" src={Rigo} alt="Profile-Pic" />USERNAME</p>
                <p className="m-0 text-secondary">28/01</p>
            </div>
            <div className="container-fluid p-0 ">
                <img className="post-pic" src={PostPic} alt="Post" />
            </div>
            <div className="container-fluid py-2 px-3 bg-light">
                <p className="mb-2">Aquí iría la descripción del post, por ejemplo: Hoy he estado Jugando Pokémon Legends Arceus, y ha sido genial poder cabalgar en este pokémon, ha sido una aventura increíble, se los recomiendo!</p>
                <div className="container-fluid p-0 d-flex justify-content-between">
                    <div>
                        <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png" />
                        <img className="ps-2" src="https://img.icons8.com/fluency-systems-regular/30/000000/comments--v1.png" />
                    </div>
                    <div>
                        <img src="https://img.icons8.com/material-outlined/30/000000/bookmark-ribbon--v1.png" />
                    </div>
                </div>
            </div>
        </div>
    )

}

Post.propTypes = {
    // id: PropTypes.number,
    // img: PropTypes.string,
    // title: PropTypes.string,
    // genres: PropTypes.array,
    // status: PropTypes.string,
    // year: PropTypes.number
}

export default Post;