import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext.js"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

// Service 
import { getUser } from "../../service/home.js";
import { getAllPosts } from "../../service/tags.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"


const Tags = () => {

    const { store } = useContext(Context)

    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token
    const { tag } = useParams()
    const [allPosts, setAllPosts] = useState({})
    const [redirect, setRedirect] = useState(false)
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})

    const getPosts = async (token) => {
		try {
			const res = await getAllPosts(token);
			const dataJSON = await res.json();
            if (dataJSON === false){
                setRedirect(true)
            } else {
                dataJSON.sort((a, b) => b.id - a.id)
			    setAllPosts(dataJSON)
            }
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
		getPosts(tag)
    }, [store.refresh, tag]);

    useEffect(() => {
        getToken(token)
	}, []);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                    {allPosts.length > 0
                        ? allPosts.map((posts, index) => (
                                <Post key={posts.id} post={posts} date={Date.parse(posts.date)} />
                        )) : (<Spinner/>)}   
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

export default Tags;