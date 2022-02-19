import React, { useEffect, useContext, useState } from "react";
import "./home.css";
import { Context } from "../../store/appContext.js"

//Service 
import { getTopAnime } from "../../service/anime.js";

// Component
import Card from "../../component/Card/Card.jsx";
import Spinner from "../../component/Spinner/Spinner.jsx";

const Home = () => {    
    const {store, actions} = useContext(Context);

    const [loading, setLoading] = useState(false);

    console.log(store)
    const topAnime = async () => {
        try{
            setLoading(true);
            const res = await getTopAnime();
            const json = await res.json();
            console.log(json);
            actions.setTopAnime(json.data);
            actions.setCopyTopAnime(json.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        topAnime();
    }, [])

    return(
        <div className="container-fluid">
            <div className=" row text-center">
                <h1>Top Anime</h1>
            </div>
            <div className="row anime-rows">
                {
                    loading ? <Spinner /> 
                    : store.topAnime.map( anime => 
                        <Card 
                            key={anime.mal_id}
                            id={anime.mal_id}
                            img = {anime.images.jpg.large_image_url} 
                            title = {anime.title}
                            genres = {anime.genres}
                            status = {anime.status}
                            year = {anime.year}
                        />
                    )
                }
            
            </div>
            
        </div>
    )

}

export default Home;