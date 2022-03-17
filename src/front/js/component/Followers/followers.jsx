import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext"
import "./followers.css";
import PropTypes from "prop-types";

// Service 

const Followers = (props) => {

    const { store, actions } = useContext(Context)
    const token = store.token
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [handleSwitch, setSwitch] = useState(true)

    const changeSwitch = () => {
        if (handleSwitch) {
            setSwitch(false)
        } else {
            setSwitch(true)
        }
    }
    
    return (
        <div className="p-3 rounded pop-up-followers">
            <div className="modal-header p-0 pb-2 mb-2">
                { handleSwitch ? (<ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Seguidos</a>
                    </li>
                    <li onClick={changeSwitch} className="nav-item">
                        <a className="nav-link" href="#">Siguiendo</a>
                    </li>
                </ul>) : (<ul className="nav nav-pills nav-fill">
                    <li onClick={changeSwitch} className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Seguidores</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Siguiendo</a>
                    </li>
                </ul>)}
                <button onClick={props.close} type="button" className="btn-close"></button>
            </div>
            
            <div className="followers-main-container">
                { handleSwitch ? (props.followers.map((follow, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <img className="profile-pic me-2" src={follow.from_user.img_url} alt="profile-pic" /><p className="mb-0 ms-1 username fs-4">{follow.from_user.username}</p>
                    </div>))) : (props.followings.map((follow, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <img className="profile-pic me-2" src={follow.to_user.img_url} alt="profile-pic" /><p className="mb-0 ms-1 username fs-4">{follow.to_user.username}</p>
                    </div>))) }
            </div>
            <div className="modal-footer mt-2 pb-0">
                <button onClick={props.close} type="button" className="btn btn-secondary">Cerrar</button>
            </div>
        </div>
    )

}

Followers.propTypes = {
    close: PropTypes.func,
    followers: PropTypes.array,
    followings: PropTypes.array
}

export default Followers;