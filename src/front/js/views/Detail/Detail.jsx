import React, { useEffect, useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { getDetailAnime } from "../../service/anime";
import { Context } from "../../store/appContext";
import "./detail.css";


// Component
import Spinner from "../../component/Spinner/Spinner.jsx";
import Badges from "../../component/Badges/Badges.jsx";
import Iframe from "../../component/Iframe/Iframe.jsx";

const Detail = () => {

    const { id } = useParams();
    const {store, actions} = useContext(Context);

    const [loading, setLoading] = useState(true);
    console.log(store.anime.trailer);

    const { trailer, title, year, status, rank, source, genres, duration, synopsis} = store.anime;

    const getAnime =  async () => {
        try{
            const res =  await getDetailAnime(id);
            const json = await res.json();
            actions.setAnime(json.data);
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getAnime();
    }, [])
    console.log(store.anime)
    // trailer.embed_url
    return (
        <>
        {loading ? <Spinner /> : 
            (
            <div className="col-md-12 container-detail">
                <div className="row">
                    <Iframe  src={trailer.embed_url} title={title} />
                    <div className="row">
                        {genres.map((genre, index) => <Badges key={index} text={genre.name} /> )}
                    </div>
                    <h3>{title}</h3>
                    <p>{synopsis}</p>
                </div>
                
            </div>
            )
        
        }
        
        </>
    )
}

export default Detail;