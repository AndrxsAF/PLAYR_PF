import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../store/appContext"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Logo from "../../../img/logo-proyecto.png"
import PhoneLogo from "../../../img/small-logo.png"
import Rigo from "../../../img/rigo-baby.jpg"
import "./Navbar.css"
import NewPost from "../../component/NewPost/NewPost.jsx";

// Service 
import { getUser } from "../../service/home.js";
import { getAllPosts } from "../../service/user";
import { getComments } from "../../service/post";

export const Navbar = () => {

  const { store, actions } = useContext(Context)
  const [addClass, setClass] = useState("visually-hidden")
  const [addClassSearch, setClassSearch] = useState("visually-hidden")
  const [addClassNotifications, setClassNotifications] = useState("visually-hidden")
  const [user, setUser] = useState({})
  const [allPosts, setAllPosts] = useState([])
  const [comment, setComment] = useState([])
  const [search, setSearch] = useState("")
  const [alert, setAlert] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [searchMethod, setMethod] = useState("")
  const [container, setContainer] = useState("")
  // const [token, setToken] = useState(sessionStorage.getItem("token"))

  // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
  const token = store.token

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
    }
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

  const getPosts = async () => {
    if (typeof user.id == 'number') {
        try {
            const res = await getAllPosts(user.id);
            const dataJSON = await res.json();
            setAllPosts(dataJSON)
        } catch (err) {
            console.log(err);
        }
    }
  };

const filterComment = () => {
  let commentList = []
  allPosts && allPosts.map((post) => getComment(post.id, commentList))
  setComment(commentList)
}

const getComment = async (id, commentList) => {
  try {
    const res = await getComments(id);
    const dataJSON = await res.json();
    commentList.push(dataJSON)
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    getToken(token)
  }, [store.refresh]);

  useEffect(() => {
    getPosts()
  }, [user])

  useEffect(() => {
    filterComment()
  }, [allPosts])

  useEffect(() => {
    setRedirect(false)
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between position-fixed navbar-z-index">
      <NavLink to={`/`}>
        <img src={Logo} alt="PLAYR" className="logo ms-5" />
        <img src={PhoneLogo} alt="PLAYR" className="phone-logo" />
      </NavLink>
      

      {/* <div className="input-group search-bar">
        <input type="text" className="form-control search-form" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
      </div> */}
      <div className="d-flex pe-5 user">
        <div className="me-3 icon d-flex align-items-center">
          <div onClick={() => searchClassToggle()} className="d-flex align-items-center">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" />
            <p className="m-0 ps-1 text-icon">Buscar</p>
          </div>
          <ul className={"bg-light dropdown-menu search search-dropdown px-2 " + addClassSearch}>
            <div className="input-group">
              <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Encuentra @Usuarios y #Tendencias" aria-describedby="button-addon2" value={search}/>
              <button onClick={handleSearch} className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
            </div>
            {alert ? (
            <div className="alert alert-danger p-2 mt-2 mb-0" role="alert">
                <p className="m-0">Debes utilizar @ para buscar usernames o # para buscar tags.</p>
            </div>) : null}
          </ul>
        </div>
        <div className="d-flex align-items-center me-3 icon" onClick={() => actions.handleShow()}>
          <img src="https://img.icons8.com/ios-filled/30/000000/plus-math.png" />
          <p className="m-0 ps-1 text-icon">Nuevo</p>
        </div>

        {
            store.showNewPost ? <NewPost close={() => actions.handleShow()}/> : null
        }


        <div className="me-3 icon d-flex align-items-center">
          <div onClick={() => notificationsClassToggle()} className="d-flex align-items-center">
            <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png" />
            <p className="m-0 ps-1 text-icon">Notificaciones</p>
          </div>
          <ul className={"bg-light dropdown-menu user-menu " + addClassNotifications}>
            <li><a className="dropdown-item" href="#">Nuevos comentarios:</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Nuevos likes:</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Nuevos seguidores:</a></li>
          </ul>
        </div>
        <NavLink className="d-flex align-items-center me-3 icon" to={`/explore`}>
            <img src="https://img.icons8.com/ios-filled/30/000000/hashtag.png" />
              <p className="m-0 ps-1 text-icon text-color-black">Explora</p>
        </NavLink>
        <div onClick={() => classToggle()} className="d-flex align-items-center justify-content-end">
          <p className="m-0 pe-1 username text-icon">{user.username}</p>
          <img src={user.img_url ? user.img_url : Rigo} alt="User" className="profile-pic" />
          <ul className={"bg-light dropdown-menu user-menu " + addClass}>
            <li><NavLink className="dropdown-item" to={`/user/${user.username}`}>Perfil</NavLink></li>
            <li><hr className="dropdown-divider" /></li>
            <li><NavLink className="dropdown-item" to={`/login`}>Cerrar Sesión</NavLink></li>
          </ul>
        </div>
      </div>
      {redirect ? <Redirect to={`/${searchMethod}/${container}`}/> : null}
    </nav>
  );
};
