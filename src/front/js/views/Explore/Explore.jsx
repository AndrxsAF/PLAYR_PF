import React, { useEffect, useContext, useState } from "react";
import "./explore.css";
import { Context } from "../../store/appContext.js"

// Pics
import pic from "../../../img/pokémon-legends-arceus.jpg"

// Service 
import { getAllPosts, getUser } from "../../service/explore.js";

// Component
import Squares from "../../component/Squares/Squares.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Explore = () => {

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
        getToken(token)
	}, []);

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="explore-container-left ps-3 pe-4 py-4 m-0 row">
                    {allPosts.length > 0
                        ? allPosts.map((post, index) => (
                                <Squares key={index} console={post.console} game={post.game} img={post.img_url} />
                        ))
                    : (<Spinner/>)}   
                    
                </div>
                <div className="container-right-support explore-4kscreen p-0">
                </div>
                    
                {user 
                    ? (<SideMenu img={user.img_url} username={user.username} biography={user.biography} />)
                    : (<Spinner/>)
                }

            </div>
        </div>
    )

}

export default Explore;