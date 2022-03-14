import React, {useContext} from "react";
import { Context } from "../../store/appContext"
import "./sidemenu.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Pics

import Rigo from "../../../img/rigo-baby.jpg"

// Service 

// Component

const SideMenu = (props) => {
    const { store, actions } = useContext(Context)

    return (
        <div className="vh-100 py-4 container-right p-3">
            <div className="container-profile-main p-0">
                <div className="container-fluid p-2 border d-flex mb-3">
                    <div className="container-fluid p-0">
                        <Link className="d-flex align-items-center username mb-2 fs-4 text-color-black" to={`/user/${props.username}`}><img className="pe-2" src="https://img.icons8.com/fluency-systems-filled/30/000000/fairytale.png" />{props.username}</Link>
                        <p className="m-0">{props.biography}</p>
                    </div>

                    {
                        props.img ? (
                            <img className="profile-pic-main ms-3 d-flex align-self-center" src={props.img} alt="Profile-Pic" />
                        ) : (
                            <img className="profile-pic-main ms-3 d-flex align-self-center" src={Rigo} alt="Profile-Pic" />
                        )}

                </div>
                <button onClick={() => actions.handleShow()} type="button" className="btn btn-danger w-100 d-flex align-items-top justify-content-center"><p className="m-0 fs-2 line-height">+</p><p className="m-0 fs-5 ps-2">Nuevo Post</p></button>
            </div>
            <div className="container-fluid border p-2 mt-5">
                <p className="d-flex align-items-center username mb-2 fs-4"><img className="pe-2" src="https://img.icons8.com/pastel-glyph/30/000000/controller--v1.png" />Tendencias:</p>
                <div className="container-fluid px-2">
                    <p className="mb-2">#PokemonLegends</p>
                    <p className="mb-2">#PokemonLegends</p>
                    <p className="mb-2">#PokemonLegends</p>
                    <p className="mb-2">#PokemonLegends</p>
                    <p className="mb-2">#PokemonLegends</p>
                    <p className="mb-2">#PokemonLegends</p>
                </div>
            </div>
        </div>
    )

}

SideMenu.propTypes = {
    img: PropTypes.string,
    username: PropTypes.string,
    biography: PropTypes.string
}

export default SideMenu;