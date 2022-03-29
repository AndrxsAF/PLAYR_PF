import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"
import { Redirect } from "react-router-dom";

// Service 
import { getAllPosts, getUser } from "../../service/home.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Home = () => {

    const { store, actions } = useContext(Context)
    const token = actions.getToken();
    const [allPosts, setAllPosts] = useState([])
    const [user, setUser] = useState({})
    const [redirect, setRedirect] = useState(false)

    const getPosts = async (token) => {
		try {
			const res = await getAllPosts(token);
			const dataJSON = await res.json();
            dataJSON.sort((a, b) => b.id - a.id)
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
		getPosts(token)
    }, [store.refresh]);

    useEffect(() => {
        getToken(token)
	}, []);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                    {allPosts.length > 0
                        ? allPosts.map((posts, index) => (
                                <Post key={index} post={posts} date={Date.parse(posts.date)} />
                        )) : (<div className="border-nopost d-flex justify-content-center flex-column align-items-center p-5"><p className="m-0 fs-3 username text-center mb-3">Comienza a seguir usuarios o explora las tendencias!!</p><img className="img-fluid w-50 p-3" src="https://res.cloudinary.com/andrxsaf/image/upload/v1648149808/6726782_hzszdv.png" alt="game-over-pic" /></div>)}   
                </div>
                <div className="container-right-support p-0">
                </div>
                    
                {user 
                    ? (<SideMenu img={user.img_url} username={user.username} biography={user.biography} />)
                    : (<Spinner/>)
                }

            </div>
            { token == "" ? <Redirect to={`/login`}/> : null}
        </div>
    )

}

export default Home;