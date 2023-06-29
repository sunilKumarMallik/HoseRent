import React from "react";
import  Carousel from "react-bootstrap/Carousel";


function CommonCarousel(props) {
  // console.log(
  //   "image",
  //   props.image.filter((x) => x != "")
  // );
  let allUrls = props.image.filter((x) => x != "");
   console.log("allUrls", allUrls);
  return (
    allUrls &&
    allUrls.length && <Carousel loop={false}>
      {
        allUrls.map((imageUrl, i) => {
          return (
            //  <h1>uyregtyuregyu</h1>
            <Carousel.Item >
              <img
                className="d-block w-100 carimg"
                src={imageUrl}
                alt="First slide"
              />
              <Carousel.Caption>
          
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
}

export default CommonCarousel;
