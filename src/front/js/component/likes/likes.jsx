import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext"
import "./likes.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Service 

const Likes = (props) => {

    const { store, actions } = useContext(Context)
    const token = store.token
    // const [token, setToken] = useState(sessionStorage.getItem("token"))

    return (
        <div className="p-3 rounded pop-up-followers">
            <div className="modal-header p-0 pb-2 mb-2">
                <p className="m-0 fs-4 username">Likes:</p>
                <button onClick={props.close} type="button" className="btn-close"></button>
            </div>
            
            <div className="followers-main-container">
                { props.likes.map((like, index) => (
                    <div key={index} className="mb-2">
                        <Link onClick={props.close} to={`/user/${like.from_user_id.username}`} className="d-flex align-items-center">
                            <img className="profile-pic me-2" src={like.from_user_id.img_url} alt="profile-pic" /><p className="mb-0 ms-1 username fs-4 text-color-black">{like.from_user_id.username}</p>
                        </Link>
                    </div>))}
            </div>
            <div className="modal-footer mt-2 pb-0">
                <button onClick={props.close} type="button" className="btn btn-secondary">Cerrar</button>
            </div>
        </div>
    )

}

Likes.propTypes = {
    close: PropTypes.func,
    likes: PropTypes.array
}

export default Likes;