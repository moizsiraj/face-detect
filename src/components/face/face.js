import React from "react";
import "./face.css";

const Face = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} width="500px" height="auto" />
        <div
          className="bounding_box"
          style={{
            top: box.toprow,
            right: box.rightcol,
            bottom: box.bottomrow,
            left: box.leftcol,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Face;
