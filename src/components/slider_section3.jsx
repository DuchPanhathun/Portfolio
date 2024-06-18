import React, { useState } from 'react';
import "../../public/css/sliders3.css";

const SliderS3 = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(slides.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="sliders3">
      <div className="carousel">
        <button className="carousel-control prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="carousel-inner">
          {items.slice(currentIndex * itemsPerSlide, (currentIndex + 1) * itemsPerSlide).map((item, index) => (
            <div className="carousel-item" key={index}>
              {item}
            </div>
          ))}
        </div>
        <button className="carousel-control next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SliderS3;