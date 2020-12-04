import React from 'react';

import './review.styles.scss';

const Review = () => {
  return (
    <div className="review__conatiner">
      <div className="review__container__user">
        <img
          src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
          alt="user"
        />
        <div className="review__container__user--details">
          <p>Subha Sarkar</p>
          <p>Rating</p>
        </div>
      </div>
      <div className="review__container__comment">This is anice product.</div>
    </div>
  );
};

export default Review;
