import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"

// Pics

// Service 
import { getAllPosts } from "../../service/home.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Home = () => {

    const [allPosts, setAllPosts] = useState({})

    const getPosts = async () => {
		try {
			const res = await getAllPosts();
			const dataJSON = await res.json();
			setAllPosts(dataJSON)
		} catch (err) {
			console.log(err);
		}
	};

    useEffect(() => {
		getPosts()
	}, []);

    console.log(allPosts)

    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                    {allPosts ?    
                        (allPosts.length > 0
                        ? allPosts.map((post, index) => (
                                <Post key={index} console={post.console} game={post.game} user_id={post.user_id} description={post.description} img={post.img_url} tags={post.tags} date={Date.parse(post.date)} />
                        ))
                        : null)
                    : (<Spinner/>)}   
                </div>
                <div className="container-right-support p-0">
                </div>

                <SideMenu/>

            </div>
        </div>
    )

}

export default Home;