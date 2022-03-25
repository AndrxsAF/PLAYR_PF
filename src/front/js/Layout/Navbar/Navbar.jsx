import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Context } from "../../store/appContext"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./Navbar.css"
import NewPost from "../../component/NewPost/NewPost.jsx";

// Service 
import { getUser } from "../../service/home.js";
import { showNotifications } from "../../service/notification.js"

export const Navbar = () => {

  const { store, actions } = useContext(Context)
  const [addClass, setClass] = useState("visually-hidden")
  const [addClassSearch, setClassSearch] = useState("visually-hidden")
  const [addClassNotifications, setClassNotifications] = useState("visually-hidden")
  const [user, setUser] = useState({})
  const [search, setSearch] = useState("")
  const [alert, setAlert] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [searchMethod, setMethod] = useState("")
  const [container, setContainer] = useState("")
  const [notification, setNotification] = useState([])
  const token = actions.getToken();
  const switcher = store.loginSwitch

  const handleSearch = () => {
    setAlert(false)
    if (search[0] == "#") {
      setMethod("tags")
      setContainer(search.slice(1))
      setSearch("")
      setRedirect(true)
      searchClassToggle()
      setTimeout(() => {
        actions.handleRefresh()
        setRedirect(false)
      }, 1000);
    } else if (search[0] == "@") {
      setMethod("user")
      setContainer(search.slice(1))
      setSearch("")
      setRedirect(true)
      searchClassToggle()
      setTimeout(() => {
        actions.handleRefresh()
        setRedirect(false)
      }, 1000);
    } else {
      setAlert(true)
    }
  }

  const classToggle = () => {
    if (addClass == "d-block") {
      setClass("visually-hidden")
      setClassSearch("visually-hidden")
      setClassNotifications("visually-hidden")
    } else {
      setClass("d-block")
      setClassSearch("visually-hidden")
      setClassNotifications("visually-hidden")
      actions.closeShow()
    }
  }

  const searchClassToggle = () => {
    if (addClassSearch == "d-block") {
      setClass("visually-hidden")
      setClassSearch("visually-hidden")
      setClassNotifications("visually-hidden")
    } else {
      setClass("visually-hidden")
      setClassSearch("d-block")
      setClassNotifications("visually-hidden")
      actions.closeShow()
    }
  }

  const notificationsClassToggle = () => {
    if (addClassNotifications == "d-block") {
      setClass("visually-hidden")
      setClassSearch("visually-hidden")
      setClassNotifications("visually-hidden")
    } else {
      setClass("visually-hidden")
      setClassSearch("visually-hidden")
      setClassNotifications("d-block")
      actions.closeShow()
    }
  }

  const closeWindows = () => {
    setClass("visually-hidden")
    setClassSearch("visually-hidden")
    setClassNotifications("visually-hidden")
  }

  const getToken = async (token) => {
    try {
      const res = await getUser(token);
      const dataJSON = await res.json();
      setUser(dataJSON)
    } catch (err) {
      console.log(err);
    }
  };

  const getNotifications = async (token) => {
    try {
      const res = await showNotifications(token);
      const dataJSON = await res.json();
      dataJSON.sort((a, b) => b.id - a.id)
      setNotification(dataJSON)
    } catch (err) {
      console.log(err);
    }
  }

  const sortNotificationByFollow = (notificationByFollow) => {
    if (notificationByFollow.type == "follow") {
      return (<li className="list-group-item bg-light" key={notificationByFollow.id}>
        <Link to={`/user/${notificationByFollow.from_user_id.username}`} className="d-flex">
          <img className="profile-pic-comment me-2" src={notificationByFollow.from_user_id.img_url} alt="profile pic" />
          <p className="text-break m-0 text-color-black">
          <strong className="username">{notificationByFollow.from_user_id.username}</strong>
            {` te ha comenzado a seguir.`}
          </p>
        </Link>
      </li>)
    } else {
      return null
    }
  }

  const sortNotificationByComment = (notificationByComment) => {
    if (notificationByComment.type == "comment") {
      return (<li className="list-group-item bg-light" key={notificationByComment.id}>
        <Link to={`/post/${notificationByComment.post_id}`} className="d-flex">
          <img className="profile-pic-comment me-2" src={notificationByComment.from_user_id.img_url} alt="profile pic" />
          <p className="text-break m-0 text-color-black">
            <strong className="username">{notificationByComment.from_user_id.username}</strong>
            {` ha comentado en tu post.`}
          </p>
        </Link>
      </li>)
    } else {
      return null
    }
  }

  const sortNotificationByLike = (notificationByLike) => {
    if (notificationByLike.type == "like") {
      return (<li className="list-group-item bg-light" key={notificationByLike.id}>
        <Link to={`/post/${notificationByLike.post_id}`} className="d-flex">
          <img className="profile-pic-comment me-2" src={notificationByLike.from_user_id.img_url} alt="profile pic" />
          <p className="text-break m-0 text-color-black">
              <strong className="username">{notificationByLike.from_user_id.username}</strong>
            {` le ha gustado tu post.`}
          </p>
        </Link>
      </li>)
    } else {
      return null
    }
  }

  const checkNotification = (type) => {
    return notification.some((element) => element.type == type)
  }

  useEffect(() => {
    getToken(token)
  }, [store.refresh, token]);

  useEffect(() => {
    setRedirect(false)
  }, [])

  useEffect(() => {
    closeWindows()
  }, [store.close])

  useEffect(() => {
    addClassNotifications == "d-block" && getNotifications(token)
  }, [addClassNotifications])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between position-fixed navbar-z-index">
      <NavLink to={`/`}>
        <img src="https://res.cloudinary.com/andrxsaf/image/upload/v1648148563/logo_proyecto_usumwb.png" alt="PLAYR" className="logo ms-5" />
        <img src="https://res.cloudinary.com/andrxsaf/image/upload/v1648148562/small-logo_u310km.png" alt="PLAYR" className="phone-logo" />
      </NavLink>

      { token == "" ? (
      <NavLink className="d-flex align-items-center me-5 icon" to={switcher ? `/register` : `/login`}>
        <p className="m-0 ps-1 text-icon text-color-black username">{ switcher ? "Registrarse" : "Iniciar Sesión"}</p>
      </NavLink>
      ) :
      (<div className="d-flex pe-5 user">
        <div className="me-3 icon d-flex align-items-center">
          <div onClick={() => searchClassToggle()} className="menu-on-hover d-flex align-items-center">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" />
            <p className="m-0 ps-1 text-icon">Buscar</p>
          </div>
          <ul className={"bg-light dropdown-menu search search-dropdown px-2 " + addClassSearch}>
            <div className="input-group">
              <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Encuentra @Usuarios y #Tendencias" aria-describedby="button-addon2" value={search} />
              <button onClick={handleSearch} className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
            </div>
            {alert ? (
              <div className="alert alert-danger p-2 mt-2 mb-0" role="alert">
                <p className="m-0">Debes utilizar @ para buscar usernames o # para buscar tags.</p>
              </div>) : null}
          </ul>
        </div>
        <div className="d-flex align-items-center me-3 icon menu-on-hover" onClick={() => actions.handleShow()}>
          <img src="https://img.icons8.com/ios-filled/30/000000/plus-math.png" />
          <p className="m-0 ps-1 text-icon">Nuevo</p>
        </div>

        {
          store.showNewPost ? <NewPost close={() => actions.handleShow()} /> : null
        }


        <div className="me-3 icon d-flex align-items-center">
          <div onClick={() => notificationsClassToggle()} className="d-flex align-items-center menu-on-hover">
            <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png" />
            <p className="m-0 ps-1 text-icon">Notificaciones</p>
          </div>
          <div onClick={() => notificationsClassToggle()} className={"bg-light dropdown-menu p-2 notification-menu " + addClassNotifications}>
            <p className="username m-0 fs-5">Notificaciones:</p>
            <hr className="dropdown-divider" />
            { checkNotification("like") ?
              (<div>
                <p className="username m-0">Nuevos likes:</p>
                <ul className="list-group list-group-flush ">
                  {notification ? notification.map((like) => sortNotificationByLike(like)) : null}
                </ul>
              </div>) : null
            }
            { checkNotification("follow") ?
              (<div>
                <p className="username m-0">Nuevos seguidores:</p>
                <ul className="list-group list-group-flush ">
                  {notification ? notification.map((follow) => sortNotificationByFollow(follow)) : null}
                </ul>
              </div>) : null
            }
            { checkNotification("comment") ?
              (<div>
                <p className="username m-0">Nuevos comentarios:</p>
                <ul className="list-group list-group-flush ">
                  {notification ? notification.map((noti) => sortNotificationByComment(noti)) : null}
                </ul>
              </div>) : null
            }
            {
              notification.length == 0 ? (<div>
                <p className="username m-0">No tienes notificaciones nuevas...</p>
              </div>) : null
            }
          </div>
        </div>
        <NavLink className="d-flex align-items-center me-3 icon" to={`/explore`}>
          <img src="https://img.icons8.com/ios-filled/30/000000/hashtag.png" />
          <p className="m-0 ps-1 text-icon text-color-black">Explora</p>
        </NavLink>
        <div onClick={() => classToggle()} className="menu-on-hover d-flex align-items-center justify-content-end">
          <p className="m-0 pe-1 username text-icon">{user.username}</p>
          <img src={user.img_url ? user.img_url : "https://res.cloudinary.com/andrxsaf/image/upload/v1648148308/4622925_yos0je.png"} alt="User" className="profile-pic" />
          <ul className={"bg-light dropdown-menu user-menu " + addClass}>
            <li><NavLink className="dropdown-item" to={`/user/${user.username}`}>Perfil</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li onClick={() => localStorage.setItem("token", "")} ><NavLink className="dropdown-item" to={`/login`}>Cerrar Sesión</NavLink></li>
          </ul>
        </div>
      </div>)}
      {redirect ? <Redirect to={`/${searchMethod}/${container}`} /> : null}
    </nav>
  );
};
