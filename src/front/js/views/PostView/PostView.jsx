import React, { useEffect, useContext, useState } from "react";
import "./postview.css";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Service 
import { getPost, getUser } from "../../service/post.js"

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const PostView = () => {

    const { post_id } = useParams()
    const { store, actions } = useContext(Context)
    const [redirect, setRedirect] = useState(false)
    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token
    
    const [post, setPost] = useState(false)
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})

    const getPosts = async (id) => {
		try {
			const res = await getPost(id);
			const dataJSON = await res.json();
            if (dataJSON === false){
                setRedirect(true)
            }
			setPost(dataJSON)
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

    useEffect(() => {
		getPosts(post_id)
        getToken(token)
    }, [store.refresh, post_id]);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                    {post 
                        ? (<Post comment={true} post={post} date={Date.parse(post.date)} key={post.id}/>) 
                        : (<Spinner/>)
                    }   
                </div>

                <div className="container-right-support p-0">
                </div>
                    
                {user 
                    ? (<SideMenu img={user.img_url} username={user.username} biography={user.biography} />)
                    : (<Spinner/>)
                }

            </div>
            {redirect ? <Redirect to={`/notfound`}/> : null}
        </div>
    )

}

export default PostView;