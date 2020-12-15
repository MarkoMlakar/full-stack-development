import React from "react";
import ImageCard from "../imageCard/imageCard";
import "./imageList.css";

const ImageList = (props) => {
  const images = props.images.map((image) => {
    return <ImageCard key={image.id} image={image} />;
  });
  return (
    <div className="image-list" data-testid="image-list">
      {images}
    </div>
  );
};

export default ImageList;
