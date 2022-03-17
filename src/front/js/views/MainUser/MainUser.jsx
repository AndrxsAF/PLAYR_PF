import React, { useEffect, useContext, useState } from "react";
import "./mainuser.css";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom";

// Pics
import Rigo from "../../../img/rigo-baby.jpg"

// Service 
import { getAllPosts, getUser, getUserByUsername } from "../../service/user.js";
import { showSaved } from "../../service/saved.js"
import { doFollow, unfollow, showFollowStatus, showFollowers, showFollowings } from "../../service/follow.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import Squares from "../../component/Squares/Squares.jsx"
import ConfigUser from "../../component/ConfigUser/ConfigUser.jsx";
import Followers from "../../component/Followers/followers.jsx";

const MainUser = () => {

    const { store, actions } = useContext(Context)

    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token

    const [allPosts, setAllPosts] = useState([])
    const [posts, setPosts] = useState([])
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [handleGrid, setHandleGrid] = useState(false)
    const { username } = useParams()
    const [validUser, setValidUser] = useState(false)
    const [saved, setSaved] = useState(false)
    const [savedPosts, setSavedPosts] = useState([])
    const [bookmark, setBookmark] = useState("https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png")
    const [follow, setFollow] = useState(false) 
    const [followings, setFollowings] = useState([])
    const [followers, setFollowers] = useState([])

    const showGrid = () => posts.length >= 0 ? posts.map((eachPost) => (<Squares key={saved ? eachPost.post.id : eachPost.id} post={saved ? eachPost.post : eachPost } />)) : (<Spinner />)
    const hideGrid = () => posts.length >= 0 ? posts.map((eachPost) => (<Post key={saved ? eachPost.post.id : eachPost.id} post={saved ? eachPost.post : eachPost } date={saved ? Date.parse(eachPost.post["date"]) : Date.parse(eachPost.date)} />)) : (<Spinner />)

    const verifyUser = () => {
        if (profile.id == user.id) {
            setValidUser(true)
        } else {
            setValidUser(false)
        }
    }

    const handleFollow = async () => {
        try {
            const body = {
                to_user_id: profile.id
            }
            if (follow) {
                const res = await unfollow(token, body);
                const dataJSON = await res.json();
                setFollow(false)
            } else {
                const res = await doFollow(token, body);
                const dataJSON = await res.json();
                setFollow(true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getFollowers = async () => {
        try {
            const res = await showFollowers(profile.id);
            const dataJSON = await res.json();
            setFollowers(dataJSON)
        } catch (err) {
            console.log(err)
        }
    }

    const getFollowings = async () => {
        try {
            const res = await showFollowings(profile.id);
            const dataJSON = await res.json();
            setFollowings(dataJSON)
        } catch (err) {
            console.log(err)
        }
    }

    const getFollowStatus = async () => {
        try {
            const res = await showFollowStatus(token, profile.id);
            const dataJSON = await res.json();
            setFollow(dataJSON)
        } catch (err) {
            console.log(err)
        }
    }

    const getPosts = async () => {
        if (typeof profile.id == 'number') {
            try {
                const res = await getAllPosts(profile.id);
                const dataJSON = await res.json();
                setAllPosts(dataJSON)
                if (!saved) {
                    setPosts(dataJSON)
                }
                user && verifyUser()
            } catch (err) {
                console.log(err);
            }
        }
    };

    const getSavedPosts = async (token) => {
        try {
            const res = await showSaved(token);
            const dataJSON = await res.json();
            setSavedPosts(dataJSON)
        } catch (err) {
            console.log(err);
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

    const handleSave = () => {
        if (saved) {
            setSaved(false)
            setPosts(allPosts)
            setBookmark("https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon--v1.png")
        } else {
            setSaved(true)
            setPosts(savedPosts)
            setBookmark("https://img.icons8.com/material-rounded/24/000000/bookmark-ribbon--v1.png")
        }
    }

    useEffect(() => {
        getToken(token)
        getUserProfile(username)
    }, [store.refresh, username]);

    useEffect(() => {
        profile && getPosts()
        profile && getFollowStatus()
        getSavedPosts(token)
    }, [user, profile])

    useEffect(() => {
        profile && getFollowings()
        profile && getFollowers()
    }, [profile, follow])

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
                        <div onClick={() => actions.handleShowFollowers()} className="row m-0 ms-2">
                            <p className="col p-0 m-0 username fs-4">Seguidores:</p>
                            <p className="col p-0 m-0 username fs-4">Siguiendo:</p>
                        </div>
                        <div onClick={() => actions.handleShowFollowers()} className="row m-0 ms-2">
                            <p className="col p-0 m-0 fs-4">{followers.length}</p>
                            <p className="col p-0 m-0 fs-4">{followings.length}</p>
                        </div>
                        <div className="row m-0 ms-2 mt-3">
                            <p className="col p-0 m-0 username fs-4"># de Posts:</p>
                            <p className="col p-0 m-0 fs-4">{allPosts.length}</p>
                        </div>
                        {validUser ? (<div className="btn-group my-3 change-grid-button w-100" role="group" aria-label="Basic radio toggle button group">
                            <input onClick={() => actions.handleShowUserConfig()} type="button" className="btn-check" name="follow" id="btnradio6" />
                            <label className="btn btn-outline-secondary" htmlFor="btnradio6">Configuración</label>
                        </div>) : (<div className="btn-group my-3 change-grid-button w-100" role="group" aria-label="Basic radio toggle button group">
                            <input onClick={handleFollow} type="button" className="btn-check" name="follow" id="follow" />
                            <label className={`btn btn-outline-secondary px-3 py-1 ${follow ? "bg-secondary text-color-white" : null}`} htmlFor="follow">{follow ? "Unfollow" : "Follow"}</label>
                        </div>)}
                    </div>
                </div>



                <div className="user-container-right pe-3 ps-4 py-4 m-0">

                    {store.showUserConfig ? (<ConfigUser img={profile ? profile.img_url : null} bio={profile ? profile.biography : null} close={() => actions.handleShowUserConfig()}/>) : null}
                    {store.showFollowers ? (<Followers close={() => actions.handleShowFollowers()} followers={followers} followings={followings}/>) : null}

                    <div className="mainuser-container-profile-phone px-3 mb-3">
                        <div className="d-flex pb-2"><div>
                            <img className="profile-pic-mainuser-phoneview" src={profile.img_url} alt="Profile-Pic" />
                        </div>
                            <div className="container-fluid p-0 ps-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <p className="username m-0 ps-2 fs-5">{profile.username}</p>
                                    </div>
                                    {validUser ? (<div className="btn-group change-grid-button m-0" role="group" aria-label="Basic radio toggle button group">
                                        <input onClick={() => actions.handleShowUserConfig()} type="button" className="btn-check" name="config" id="btnradio5" />
                                        <label className="btn btn-outline-secondary p-1" htmlFor="btnradio5"><img src="https://img.icons8.com/ios-filled/26/000000/settings.png" /></label>
                                    </div>) : (<div className="btn-group change-grid-button m-0" role="group" aria-label="Basic radio toggle button group">
                                        <input onClick={handleFollow} type="button" className="btn-check" name="follow" id="follow" />
                                        <label className={`btn btn-outline-secondary px-3 py-1 ${follow ? "bg-secondary text-color-white" : null}`} htmlFor="follow">{follow ? "Unfollow" : "Follow"}</label>
                                    </div>)}
                                </div>
                                <div className="row">
                                    <div onClick={() => actions.handleShowFollowers()} className="col d-flex flex-column align-items-center">
                                        <p className="m-0 fs-4 lh-1">{followers.length}</p>
                                        <p className="m-0 username">Seguidores</p>
                                    </div>
                                    <div onClick={() => actions.handleShowFollowers()} className="col d-flex flex-column align-items-center">
                                        <p className="m-0 fs-4 lh-1">{followings.length}</p>
                                        <p className="m-0 username">Siguiendo</p>
                                    </div>
                                    <div className="col d-flex flex-column align-items-center">
                                        <p className="m-0 fs-4 lh-1">{allPosts.length}</p><p className="m-0 username">Posts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="m-0">{profile.biography}</p>
                        </div>
                    </div>



                    <div className="d-flex justify-content-center">
                        <div className="btn-group mb-3 change-grid-button" role="group" aria-label="Basic radio toggle button group">
                            <input onClick={() => handleGrid ? setHandleGrid(false) : setHandleGrid(true)} type="checkbox" className="btn-check" name="btnradio" id="btnradio1" />
                            <label className="btn btn-outline-secondary p-0" htmlFor="btnradio1"><img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-grid-alignment-and-tools-kiranshastry-lineal-kiranshastry-1.png" /></label>
                        </div>
                        {validUser ? (<div className="btn-group mb-3 change-grid-button mx-1" role="group" aria-label="Basic radio toggle button group">
                            <input onClick={handleSave} type="button" className="btn-check" name="saved" id="saved" />
                            <label className="btn btn-outline-secondary py-0 px-1" htmlFor="saved"><img src={bookmark} /></label>
                        </div>) : null}
                    </div>



                    <div className="m-0 row container-fluid p-0">
                        {handleGrid ? showGrid() : hideGrid()}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default MainUser;