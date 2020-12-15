import React, { useContext } from "react";
import "./imageCard.css";
import DisabledLikeIcon from "../../../assets/icons/card-like-disabled.svg";
import { AuthContext } from "../../contexts/authContext";

const ImageCard = (image) => {
  const { user } = useContext(AuthContext);
  const { alt_description, urls } = image.image;

  return (
    <React.Fragment>
      <div
        className="image-card"
        data-testid="card-image"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.7) 89.5%), 
            url(${urls.regular})`,
        }}
      >
        {user.valid ? (
          <div className="card-like-star">
            {/* TODO: Instead of chaniging the whole image we could construct it with CSS 
            and change the background color of circle and star   
            */}

            <img
              src={DisabledLikeIcon}
              data-testid="card-favorite"
              alt="like-icon-disabled"
            />
          </div>
        ) : null}
        <div className="card-content">
          <div className="card-title" data-testid="card-title">
            {alt_description}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageCard;
