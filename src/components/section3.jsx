import React, { useEffect, useState } from "react";
import { GUI } from 'https://cdn.skypack.dev/dat.gui';
import "../../public/css/section3.css";  // Make sure to adjust the path as needed

const Carousel1 = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    return (
      <div className="carousel1">
        <div className="carousel1-container">
          <div className="carousel-slides">
            <img className="slide1 image-achievement" src={slides[currentSlide]} alt="" />
            <style>
                {`
                    .image-achievement {
                        width:260px;
                        height: 200px;
                        border-radius: 10px 10px 10px 10px;
                        }
                    }
                `}
            </style>
          </div>
          <div className="indicators1">
            {slides.map((slide, index) => (
              <button
                key={index}
                className={`indicator1 ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              >
                <style>
                        {`
                            .indicators1 {
                                margin-top: -17px;
                                display: flex;
                                justify-content: center;
                                gap: 10px;
                                .indicator1 {
                                    border: none;
                                    width: 10px;
                                    height: 10px;
                                    background-color: #000;
                                    color: #000;
                                    cursor: pointer;
                                    border-radius: 50%;
                                }
                            }
                        `}
                </style>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
};
const Section3 = () => {
    const firstCarouselSlides = [
        '../../public/img/1st_exp.jpg',
        '../../public/img/1st_exp1.jpg',
    ];
    const secondCarouselSlides = [
        '../../public/img/2nd_exp1.jpg',
        '../../public/img/2nd_exp3.jpg',
        '../../public/img/2nd_exp4.jpg',
        '../../public/img/2nd_exp5.jpg',
        '../../public/img/2nd_exp6.jpg',
        '../../public/img/2nd_exp7.jpg',
    ];
    const thirdCarouselSlides = [
        '../../public/img/3rd_exp.jpg',
        '../../public/img/3rd_exp1.jpg',
        '../../public/img/3rd_exp2.jpg',
    ];
    const fourthCarouselSlides = [
        '../../public/img/4th_exp.jpg',
    ];
    useEffect(() => {
        const CONTAINER = document.querySelector('.container');
        const CARDS = document.querySelectorAll('article');

        const CONFIG = {
            proximity: 40,
            spread: 80,
            blur: 20,
            gap: 32,
            vertical: false,
            opacity: 0,
        };

        const PROXIMITY = 10;

        const UPDATE = (event) => {
            for (const CARD of CARDS) {
                const CARD_BOUNDS = CARD.getBoundingClientRect();

                if (
                    event?.x > CARD_BOUNDS.left - CONFIG.proximity &&
                    event?.x < CARD_BOUNDS.left + CARD_BOUNDS.width + CONFIG.proximity &&
                    event?.y > CARD_BOUNDS.top - CONFIG.proximity &&
                    event?.y < CARD_BOUNDS.top + CARD_BOUNDS.height + CONFIG.proximity
                ) {
                    CARD.style.setProperty('--active', 1);
                } else {
                    CARD.style.setProperty('--active', CONFIG.opacity);
                }

                const CARD_CENTER = [
                    CARD_BOUNDS.left + CARD_BOUNDS.width * 0.5,
                    CARD_BOUNDS.top + CARD_BOUNDS.height * 0.5
                ];

                let ANGLE = Math.atan2(event?.y - CARD_CENTER[1], event?.x - CARD_CENTER[0]) * 180 / Math.PI;
                ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;
                CARD.style.setProperty('--start', ANGLE + 90);
            }
        };

        document.body.addEventListener('pointermove', UPDATE);

        const RESTYLE = () => {
            CONTAINER.style.setProperty('--gap', CONFIG.gap);
            CONTAINER.style.setProperty('--blur', CONFIG.blur);
            CONTAINER.style.setProperty('--spread', CONFIG.spread);
            CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
        };

        const CTRL = new GUI({
            width: 340,
        });

        CTRL.add(CONFIG, 'spread', 10, 180, 1).name('Spread (deg)').onChange(RESTYLE);
        CTRL.add(CONFIG, 'proximity', 10, 180, 1).name('Active Proximity (px)').onChange(RESTYLE);
        CTRL.add(CONFIG, 'gap', 10, 100, 1).name('Gap (px)').onChange(RESTYLE);
        CTRL.add(CONFIG, 'blur', 0, 50, 1).name('Blur (px)').onChange(RESTYLE);
        CTRL.add(CONFIG, 'opacity', 0, 1, 0.01).name('Inactive Opacity').onChange(RESTYLE);
        CTRL.add(CONFIG, 'vertical').name('Vertical Layout').onChange(RESTYLE);

        RESTYLE();
        UPDATE();

        return () => {
            document.body.removeEventListener('pointermove', UPDATE);
            // Add any additional cleanup if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return (
        <div className="section3" id="section3">
            <div className="animation-title-achievement">
                <h1 className='title-achievement'>My Experience</h1>
            </div>
            <div className="container">
                <article>
                    <div className="glows"></div>
                    <Carousel1 slides={firstCarouselSlides} />
                    <h2 className="experience-title">Data Collector</h2>
                    <p className="experience-detail">As a freelance data collector for CONFULUENCES ASIE CO., LTD, I actively contributed to their projects 
                        in Siem Reap, Battambang, and Banteay Meanchey Province. My responsibilities included efficiently gathering 
                        and organizing essential data, ensuring accuracy and completeness. This experience enhanced my skills in data collection very well as my 
                        understanding of the unique challenges and opportunities present in diverse geographical areas.</p>
                </article>
                <article>
                    <div className="glows"></div>
                    <Carousel1 slides={secondCarouselSlides} />
                    <h2 className="experience-title">Volunteer</h2>
                    <p className="experience-detail">I volunteered as a key member for the 32nd SEA Games and 12th ASEAN Para Games' opening and closing ceremonies. 
                    My responsibilities included logistical support and event management, ensuring the smooth execution of these significant events. This experience 
                    enhanced my teamwork and organizational skills while deepening my appreciation for cultural celebrations and major international sports ceremonies</p>  
                </article>
                <article>
                    <div className="glows"></div>
                    <Carousel1 slides={thirdCarouselSlides} />
                    <h2 className="experience-title">Event Organizing Assistant</h2>
                    <p className="experience-detail">I served as an event organizing assistant at Angkor Mathematic Cambodia, contributing to the successful execution of various 
                    initiatives. My role involved coordinating logistics and supporting event planning, enhancing my organizational skills and providing valuable assistance to ensure 
                    the smooth flow of activities. This experience allowed me to actively contribute to the organization's mission in promoting mathematics education in Cambodia.</p>
                </article>
                <article>
                    <div className="glows"></div>
                    <Carousel1 slides={fourthCarouselSlides} />
                    <h2 className="experience-title">Event Organizing Assistant</h2>
                    <p className="experience-detail">As an event organizing assistant for the Math Kangaroo Cambodia Competition, I played a crucial role in facilitating the smooth operation 
                    of the event. Tasked with logistical coordination and event planning support, my volunteer work enhanced my organizational skills while contributing to the success of this 
                    educational initiative. This experience deepened my commitment to fostering mathematical education and community engagement through meaningful events.</p>
                </article>
                {/* Repeat the same structure for the second article */}
            </div>
            
        </div>
    );
}

export default Section3;
