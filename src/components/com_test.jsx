import React, { useState } from 'react';
import '../../public/css/com_test.css';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <div className="carousel-slides">
          <button className="previos-slide-carousel" onClick={prevSlide}>
            <img src="../../public/img/chevron-left.svg" alt="" />
          </button>
          <img className="slide image-achievement" src={slides[currentSlide]} alt="" />
          <button className="next-slide-carousel" onClick={nextSlide}>
            <img src="../../public/img/chevron-right.svg" alt="" />
          </button>
        </div>
        <div className="indicators">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ComTest = () => {
  const firstCarouselSlides = [
    '../../public/img/1st_achieve.jpg',
    '../../public/img/1st_achieve.jpg',
    '../../public/img/2nd_achieve.jpg',
    // Add more first carousel slide image paths as needed
  ];

  const secondCarouselSlides = [
    '../../public/img/3rd_achieve.jpg',
    '../../public/img/4th_achieve.jpg',
    // Add more second carousel slide image paths as needed
  ];
  const thirdCarouselSlides = [
    '../../public/img/3rd_achieve.jpg',
    '../../public/img/4th_achieve.jpg',
    // Add more second carousel slide image paths as needed
  ];

  // Add more sets of slides for additional carousels

  return (
    <div>
      <Carousel slides={firstCarouselSlides} />
      <Carousel slides={secondCarouselSlides} />
      <Carousel slides={thirdCarouselSlides} />
      {/* Add more Carousel components with different sets of slides as needed */}
    </div>
  );
};

export default ComTest;