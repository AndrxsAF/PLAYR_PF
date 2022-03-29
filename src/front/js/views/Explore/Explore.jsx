import React, { useEffect, useContext, useState } from "react";
import "./explore.css";
import { Context } from "../../store/appContext.js"
import { Redirect } from "react-router-dom";

// Service 
import { getAllPosts, getUser } from "../../service/explore.js";

// Component
import Squares from "../../component/Squares/Squares.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Explore = () => {

    const { store, actions } = useContext(Context)
    const token = actions.getToken();
    const [allPosts, setAllPosts] = useState({})
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
        getToken(token)
	}, []);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="explore-container-left ps-3 pe-4 py-4 m-0 row">
                    {allPosts.length > 0
                        ? allPosts.map((posts, index) => (
                                <Squares key={index} post={posts} />
                        ))
                    : (<div className="border-nopost d-flex justify-content-center flex-column align-items-center p-5"><p className="m-0 fs-3 username text-center mb-3">Aún no hay tendencias :( <br/> comienza a dar like!!</p><img className="img-fluid w-50 p-3" src="https://res.cloudinary.com/andrxsaf/image/upload/v1648149808/6726782_hzszdv.png" alt="game-over-pic" /></div>)}   
                    
                </div>
                <div className="container-right-support explore-4kscreen p-0">
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

export default Explore;