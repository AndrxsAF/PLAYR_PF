import React, {useState, useContext, useEffect} from "react";
import {  NavLink } from "react-router-dom";
import { Context } from "../../store/appContext"
import Logo from "../../../img/logo-proyecto.png"
import Rigo from "../../../img/rigo-baby.jpg"
import "./Navbar.css"

export const Navbar = () => {

  const { store, actions } = useContext(Context)
	const [addClass, setClass] = useState("visually-hidden")

	const classToggle = () => addClass == "d-block" ? setClass("visually-hidden") : setClass("d-block")
 
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <img src={Logo} alt="PLAYR" className="logo ps-5"/>
      <div class="input-group search-bar">
        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"/>
      </div>
      <div className="d-flex pe-5">
        <div className="d-flex align-items-center me-3">
          <img src="https://img.icons8.com/ios-filled/30/000000/plus-math.png"/>
          <p className="m-0 ps-1">Nuevo</p>
        </div>
        <div className="d-flex align-items-center me-3">
          <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png"/>
          <p className="m-0 ps-1">Notificaciones</p>
        </div>
        <div className="d-flex align-items-center me-3">
          <img src="https://img.icons8.com/ios-filled/30/000000/hashtag.png"/>
          <p className="m-0 ps-1">Explora</p>
        </div>
        <div onClick={() => classToggle()} className="d-flex align-items-center justify-content-end">
          <p className="m-0 pe-1 username">USUARIO</p>
          <img src={Rigo} alt="User" className="profile-pic"/>
          <ul style={{left: "auto", top: "100%"}} className={"bg-light dropdown-menu " + addClass}>
            <li><a className="dropdown-item" href="#">Perfil</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </nav>
	);
};
