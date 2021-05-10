import React from 'react';

const ListingImage = ({ url, alt ,bgColor}) => {
  return ( <div
    style={styles}
  >
      <img
        src={url}
        alt={alt}
        className="rounded mx-auto d-block img-thumbnail"
        style={{background:`${bgColor}`}}
    />
  </div> );
}

const styles = {
  width: 200,
  marginTop: 20,
  marginBottom: 30,
  marginLeft: "auto",
  marginRight: "auto",
} 

export default ListingImage;