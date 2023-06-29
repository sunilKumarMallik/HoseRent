import ReactStars from "react-rating-stars-component";
import React from "react";


function RatingChanged() {
const ratingChange = (newRating) => {
   console.log(newRating);
}; 
  return (


  <ReactStars
    count={5}
    onChange={ratingChange}
    size={24}
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    filledIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />,
  document.getElementById("where-to-render")
  )
}

export default RatingChanged