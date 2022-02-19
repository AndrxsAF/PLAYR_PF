// import React from "react";
// import "./card.css";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import Badges from "../Badges/Badges.jsx";

// const Card = ({id, title, genres, img, status, year}) => {
  
//     return (
//         <div className="card card-anime col-sm-10 col-md-3" >
//         <img src={img} className="card-img-top" alt="..." />
//         <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <div className="card-text row row-badges">{
//                 genres.map( (genre, index) => <Badges  key={index}  text={genre.name}/>)
//             }</div>
//             <div><strong>Status:</strong> {status} </div>
//             <div><b>Year:</b> {year}</div>
//             <Link to={`/anime/${id}`} className="btn btn-primary mt-3">See more...</Link>
//         </div>
//         </div>
//     )

// }

// Card.propTypes = {
//     id: PropTypes.number,
//     img: PropTypes.string,
//     title: PropTypes.string,
//     genres: PropTypes.array,
//     status: PropTypes.string,
//     year: PropTypes.number
// }

// export default Card;