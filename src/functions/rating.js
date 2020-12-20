import React from "react";
import StarRating from "react-star-ratings";
import { productStar } from "./product";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    
    let result = totalReduced/length;
    
    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating 
            starRatedColor="red" 
            starDimension="20px"
            starSpacing="2px" 
            rating={result} 
            editing={false}
          />  ({p.ratings.length})
        </span>
      </div>
    );
  }
};
