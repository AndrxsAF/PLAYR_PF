import React, { useEffect, useContext, useState } from "react";
import "./post.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Pics

import Rigo from "../../../img/rigo-baby.jpg"

// Service 

import { getUsers, getComments, uploadNewComment, getUserByToken, deletePost, deleteComment } from "../../service/post.js";

// Component

import Comment from "../Comment/Comment.jsx"

const Post = (props) => {

    
    const { store, actions } = useContext(Context)
    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [users, setUsers] = useState({})
    const [user, setUser] = useState(false)
    const [comments, setComments] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState([])
    const [description, setDescription] = useState("")
    const date = new Date(props.date)
    const [validUser, setValidUser] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const verifyUser = () => {
        if (props.user_id == user.id) {
            setValidUser(true)
        } else {
            setValidUser(false)
        }
    }

    const getToken = async (token) => {
        try {
            const res = await getUserByToken(token);
            const dataJSON = await res.json();
            setUser(dataJSON)
            actions.handleRefresh()
        } catch (err) {
            console.log(err);
        }
    };

    const getUser = async (id) => {
		try {
			const res = await getUsers(id);
			const dataJSON = await res.json();
			setUsers(dataJSON)
		} catch (err) {
			console.log(err);
		}
	};


    const uploadComment = async () => {
        setAlert(false)
        const alertArr = []
        if (description.length > 279) {
            setAlert(true)
            alertArr.push('- Máximo 280 caracteres permitidos por comentario.')
        }
        if (description == "") {
            setAlert(true)
            alertArr.push('- Debes comentar algo.')
        }
        setAlertContent(alertArr)
        if (alertArr.length == 0) {
            try {
                const body = {
                    post_id: props.id,
                    description: description
                }
                const resp = await uploadNewComment(body, token)
                const data = await resp.json()
                setDescription("")
                actions.handleRefresh()
            } catch (err) {
                console.log(err)
            }
        }
    }

    const getComment = async (id) => {
		try {
			const res = await getComments(id);
			const dataJSON = await res.json();
			setComments(dataJSON)
            user && verifyUser()
		} catch (err) {
			console.log(err);
		}
	};

    const deleteComments = async (user_id, id) => {
        try {
            const body = {
                user_id: user_id,
                id: id
            }
			const res = await deleteComment(body);
            actions.handleRefresh()
		} catch (err) {
			console.log(err);
		}
    }

    const deletePosts = async () => {
        try {
            const body = {
                user_id: props.user_id,
                id: props.id
            }
            comments && await comments.map((comment) => deleteComments(comment.user_id, comment.id))
			const res = await deletePost(body, token);
            actions.handleRefresh()
            setRedirect(true)
		} catch (err) {
			console.log(err);
		}
    }

    useEffect(() => {
		getUser(props.user_id)
        getToken(store.token)
	}, [props.user_id])

    useEffect(() => {
        getComment(props.id)
    }, [store.refresh])

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
                <div className="container-fluid p-0 pb-2 d-flex justify-content-between">
                    <div>
                        <img src="https://img.icons8.com/fluency-systems-regular/30/000000/star--v1.png" />
                        {props.comment ? null : (<Link to={`/post/${props.id}`}>
                            <img className="ps-2" src="https://img.icons8.com/fluency-systems-regular/30/000000/comments--v1.png" />
                        </Link>)}
                    </div>
                    <div>
                        {
                            validUser ? (<button onClick={deletePosts} type="button" className="btn-close"/>) : (<img src="https://img.icons8.com/material-outlined/30/000000/bookmark-ribbon--v1.png" />)
                        }
                    </div>
                </div>
                {
                    props.img ? ( <p className="mb-2"><strong className="username">{users.username}</strong> {props.description}</p> )
                    : (<p className="mb-2">{props.description}</p>)
                }
                <p className={`username ${props.comment && `m-0`}`}>{props.tags.map((tag) => {
                    if (tag !== "") {
                        return `${tag} `
                    }
                }
                )}</p>
            </div>
            {props.comment ? (
                <div className="container-fluid py-2 px-3 bg-light border-top">
                    <div className="container-fluid p-0">
                        <ul className="py-0 m-0 px-1">
                            {comments ? comments.map((comment, index) => (<Comment token_id={user.id} id={comment.id} valid={validUser} description={comment.description} user_id={comment.user_id} key={index}/>)) : null}
                        </ul>
                    </div>
                    {alert ? (
                        <div className="alert alert-danger p-2" role="alert">
                            {alertContent.map((elem, index) => (<p key={index} className="m-0">{elem}</p>))}
                        </div>) : null}
                    <div className="input-group input-group-sm my-2">
                        <input onChange={(e) => setDescription(e.target.value)} type="text" className="form-control" placeholder="Añade un comentario." aria-label="Recipient's username" aria-describedby="button-addon2" value={description}/>
                        <button onClick={uploadComment} className="btn btn-outline-secondary" type="button" id="button-addon2">Publicar</button>
                    </div>
                </div>) : null}
            {redirect ? <Redirect to={`/`}/> : null}
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
    id: PropTypes.number
}

export default Post;