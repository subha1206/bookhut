import React from 'react';
import convertDate from '../../../utils/convertDate';

import './review.styles.scss';

const Review = ({ review }) => {
  return (
    <div className="review__conatiner">
      <div className="review__container__user">
        <img src={review.userImg} alt={review.userName} />
        <div className="review__container__user--details">
          <p className="user--name">{review.userName}</p>
          <p className="review--time">{convertDate(review.createdAt)}</p>
        </div>
      </div>
      <div className="review__container__comment">{review.review}</div>
    </div>
  );
};

export default Review;
