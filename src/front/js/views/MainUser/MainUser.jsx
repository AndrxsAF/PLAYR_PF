import React, { useEffect, useContext, useState } from "react";
import "./mainuser.css";
import { Context } from "../../store/appContext.js"
import { Link, useParams } from "react-router-dom";

// Pics
import Rigo from "../../../img/rigo-baby.jpg"

// Service 
import { getAllPosts, getUser, getUserByUsername } from "../../service/user.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import Squares from "../../component/Squares/Squares.jsx"

const MainUser = () => {

    const { store, actions } = useContext(Context)

    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token

    const [allPosts, setAllPosts] = useState({})
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [handleGrid, setHandleGrid] = useState(false)
    const { username } = useParams()

    const showGrid = () => allPosts.length > 0 ? allPosts.map((post, index) => (<Squares key={index} console={post.console} game={post.game} img={post.img_url} />)) : (<Spinner />)
    const hideGrid = () => allPosts.length > 0 ? allPosts.map((post, index) => (<Post key={index} console={post.console} game={post.game} user_id={post.user_id} description={post.description} img={post.img_url} tags={post.tags} date={Date.parse(post.date)} />)) : (<Spinner />)


    const getPosts = async (userid) => {
        if (typeof userid == 'number') {
            try {
                const res = await getAllPosts(userid);
                const dataJSON = await res.json();
                setAllPosts(dataJSON)
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getToken = async (token) => {
        try {
            const res = await getUser(token);
            const dataJSON = await res.json();
            setUser(dataJSON)
        } catch (err) {
            console.log(err);
        }
    };

    const getUserProfile = async (username) => {
        try {
            const res = await getUserByUsername(username);
            const dataJSON = await res.json();
            setProfile(dataJSON)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getToken(token)
        getUserProfile(username)
    }, []);

    useEffect(() => {
        getPosts(profile ? profile.id : null)
    }, [profile])

    return (
        <div className="container-fluid mainuser-container p-0">
            <div className="d-flex justify-content-center p-0">
                <div className="user-container-left-support explore-4kscreen p-0">
                </div>


                <div className="mainuser-menu p-3">
                    <div className="d-flex justify-content-center">
                        {
                        profile.img_url ? (
                            <img className="profile-pic-mainuser" src={profile.img_url} alt="Profile-Pic" />
                        ) : (
                            <img className="profile-pic-mainuser" src={Rigo} alt="Profile-Pic" />
                        )}
                    </div>
                    <div className="container-fluid px-0">
                        <p className="d-flex align-items-center username-mainuser my-2 fs-2"><img className="pe-2" src="https://img.icons8.com/fluency-systems-filled/40/000000/fairytale.png" />{profile.username}</p>
                        <p className="m-2 me-0 username text-break mainuser-data-container">{profile.biography}</p>
                    </div>
                    <div className="">
                        <div className="row m-0 ms-2">
                            <p className="col p-0 m-0 username fs-4">Seguidores:</p>
                            <p className="col p-0 m-0 username fs-4">Seguidos:</p>
                        </div>
                        <div className="row m-0 ms-2">
                            <p className="col p-0 m-0 fs-4">300</p>
                            <p className="col p-0 m-0 fs-4">321</p>
                        </div>
                        <div className="row m-0 ms-2 mt-3">
                            <p className="col p-0 m-0 username fs-4"># de Posts:</p>
                            <p className="col p-0 m-0 fs-4">{allPosts.length}</p>
                        </div>
                        <div className="btn-group my-3 change-grid-button w-100" role="group" aria-label="Basic radio toggle button group">
                            <input type="checkbox" className="btn-check" name="follow" id="btnradio2" />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio2">Seguir</label>
                        </div>
                    </div>
                    
                    
                </div>
                <div className="user-container-right pe-3 ps-4 py-4 m-0 row">
                    <div className="btn-group mb-3 change-grid-button" role="group" aria-label="Basic radio toggle button group">
                        <input onClick={() => handleGrid ? setHandleGrid(false) : setHandleGrid(true)} type="checkbox" className="btn-check" name="btnradio" id="btnradio1" />
                        <label className="btn btn-outline-secondary" htmlFor="btnradio1">Change View</label>
                    </div>
                    {handleGrid ? showGrid() : hideGrid()}
                </div>
            </div>
        </div>
    )

}

export default MainUser;