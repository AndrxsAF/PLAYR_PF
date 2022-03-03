import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"

<<<<<<< HEAD


const Home = () => {    
 
    return(
        <div className="container-fluid">

            Hola
                
=======
// Pics

// Service 
import { getAllPosts, getUser } from "../../service/home.js";

// Component
import Post from "../../component/Post/Post.jsx"
import Spinner from "../../component/Spinner/Spinner.jsx";
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Home = () => {

    // OJO CON EL TOKEN Y CON LA URL HAY QUE EDITARLA
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0NjE3NzU1MywianRpIjoiMDE5ZjcxOTUtZmY4Ni00MjU1LWE3ZDgtZDM4NmRhODI0NDE2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6Mn0sIm5iZiI6MTY0NjE3NzU1MywiZXhwIjoxNjQ2MTc4NDUzfQ.Rq-AMU0R7_pZxsFuJSmbbryWHgswmFgxzvWsR9Wb0Xc"
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
                    
                {user 
                    ? (<SideMenu img={user.img_url} username={user.username} biography={user.biography} />)
                    : (<Spinner/>)
                }

            </div>
>>>>>>> a032bb64e9fbbc1daede790d553c8f463c3744a4
        </div>
    )

}

export default Home;