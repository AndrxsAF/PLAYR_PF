import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"

// Pics

// Service 
import { getAllPosts, getUser } from "../../service/home.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Home = () => {

    const { store, actions } = useContext(Context)

    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = store.token
    
    const [allPosts, setAllPosts] = useState({})
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [user, setUser] = useState({})

    const getPosts = async () => {
		try {
			const res = await getAllPosts();
			const dataJSON = await res.json();
			setAllPosts(dataJSON)
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
		getPosts()
    }, [store.refresh]);

    useEffect(() => {
        getToken(token)
	}, []);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                    {allPosts.length > 0
                        ? allPosts.map((post, index) => (
                                <Post key={index} console={post.console} game={post.game} user_id={post.user_id} description={post.description} img={post.img_url} tags={post.tags} date={Date.parse(post.date)} />
                        )) : (<Spinner/>)}   
                </div>
                <div className="container-right-support p-0">
                </div>
                    
                {user 
                    ? (<SideMenu img={user.img_url} username={user.username} biography={user.biography} />)
                    : (<Spinner/>)
                }

            </div>
        </div>
    )

}

export default Home;