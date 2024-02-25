import React, { useState, useEffect } from "react";
import { getSlides } from "../../api/Slide";
import { getResourcePhoto } from "../../api/Personel";

function Slide() {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [slidePhotoUrls, setSlidePhotoUrls] = useState({});

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      try {
        const slidesResponse = await getSlides();
        if (slidesResponse.status === 200) {
          setSlides(slidesResponse.data);

          const slidePhotoPromises = slidesResponse.data.map((slide) =>
            getResourcePhoto(slide.photoId)
              .then((photoResponse) => ({
                id: slide.id,
                url: URL.createObjectURL(photoResponse.data),
              }))
              .catch((error) => ({ id: slide.id, url: "" }))
          );

          const slidePhotos = await Promise.all(slidePhotoPromises);
          const slideUrls = slidePhotos.reduce((acc, current) => {
            acc[current.id] = current.url;
            return acc;
          }, {});

          setSlidePhotoUrls(slideUrls);
        } else {
          setError("Failed to load slides from server");
        }
      } catch (error) {
        setError("An error occurred while fetching slides");
        console.error("Error fetching slides", error);
      }
      setIsLoading(false);
    };

    fetchSlides();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : slides.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div>
      {slides.length > 0 && (
        <div className="slide-container">
          <button onClick={handlePrevClick}>{"<"}</button>
          <div className="slide-card">
            <h2>Haberler</h2>
            <img
              src={slidePhotoUrls[slides[currentIndex].id]}
              alt="Slide"
              className="slide-image"
            />
            <p className="slide-description">
              {slides[currentIndex].description}
            </p>
          </div>
          <button onClick={handleNextClick}>{">"}</button>
        </div>
      )}
    </div>
  );
}

export default Slide;
