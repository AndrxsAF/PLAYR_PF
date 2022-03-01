import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"

// Pics

// Service 

// Component
import Post from "../../component/Post/Post.jsx"
import SideMenu from "../../component/SideMenu/SideMenu.jsx"

const Home = () => {    
    return(
        <div className="container-fluid container-main-page p-0">
            <div className="d-flex justify-content-center p-0 container-main-phoneview">
                <div className="container-left ps-3 pe-4 pt-4 m-0">
                        
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                        
                </div>
                <div className="container-right-support p-0">
                </div>

                <SideMenu/>

            </div>
        </div>
    )

}

export default Home;