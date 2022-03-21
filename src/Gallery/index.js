import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageModal from "../imageModal";
const Gallery = ({ images }) => {
  const api_key = "368d2bbffc30c0397568a5d4a232f7a1";
  const [selectedImage, setSelectedImage] = useState();
  const [imagesG, setImagesG] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const selectMethod = (e) => {
    setSelectedImage(e.target.src);
    setModalOpen(true);
  };

  const getData = async () => {
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${api_key}&format=json&nojsoncallback=1`
    );
    const body = await response.json();
    console.log(body);
    setImagesG(body.photos.photo);
    return body;
  };
  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setImagesG(images.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  useEffect(() => {
    const images = getData();
  }, []);
  return (
    <>
      {!isModalOpen ? (
        <div className="grid-container">
          {images ? (
            <InfiniteScroll
              dataLength={images.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              className="grid-container"
            >
              {images.map((imageSrc, index) => {
                let path = `https://live.staticflickr.com/${imageSrc.server}/${imageSrc.id}_${imageSrc.secret}.jpg`;
                return (
                  <div className="grid-item" key={index}>
                    <img
                      key={imageSrc.id}
                      src={path}
                      alt="grid-gallery"
                      onClick={selectMethod}
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            <InfiniteScroll
              dataLength={imagesG.length}
              next={fetchMoreData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              className="grid-container"
            >
              {imagesG.map((imageSrc, index) => {
                let path = `https://live.staticflickr.com/${imageSrc.server}/${imageSrc.id}_${imageSrc.secret}.jpg`;
                return (
                  <div className="grid-item" key={index}>
                    <img
                      key={imageSrc.id}
                      src={path}
                      alt="grid-gallery"
                      onClick={selectMethod}
                    />
                  </div>
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      ) : (
        <ImageModal
          imageUrl={selectedImage}
          setModalOpen={setModalOpen}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};
export default Gallery;
