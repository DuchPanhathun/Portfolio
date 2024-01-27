import React, { useEffect, useState } from 'react';
import "../../public/css/section2.css";

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

const Section2 = () => {
  const firstCarouselSlides = [
    '../../public/img/1st_achieve.jpg',
    '../../public/img/1st_achieve1.jpg',
    '../../public/img/1st_achieve2.jpg',
    '../../public/img/1st_achieve3.jpg',
    '../../public/img/1st_achieve4.jpg',
  ];
  const secondCarouselSlides = [
    '../../public/img/2nd_achieve.jpg',
    '../../public/img/2nd_achieve1.jpg',
    '../../public/img/2nd_achieve2.jpg',
  ];
  const thirdCarouselSlides = [
    '../../public/img/3rd_achieve.jpg',
  ];
  const fourthCarouselSlides = [
    '../../public/img/4th_achieve.jpg',
    '../../public/img/4th_achieve1.jpg',
    '../../public/img/4th_achieve2.jpg',
    '../../public/img/4th_achieve3.jpg',
  ];
  const fifthCarouselSlides = [
    '../../public/img/5th_achieve.jpg',
    '../../public/img/5th_achieve1.jpg',
    '../../public/img/5th_achieve2.jpg',
  ];
  const sixthCarouselSlides = [
    '../../public/img/6th_achieve.jpg',
  ];
  const seventhCarouselSlides = [
    '../../public/img/7th_achieve.jpg',
  ];
  const eighthCarouselSlides = [
    '../../public/img/8th_achieve.jpg',
  ];
  const ninethCarouselSlides = [
    '../../public/img/9th_achieve.jpg',
  ];
  const tenthCarouselSlides = [
    '../../public/img/12th_achieve.jpg',
    '../../public/img/11th_achieve.jpg',
    '../../public/img/10th_achieve.jpg',
  ];
  useEffect(() => {
    const elementsToObserve = document.querySelectorAll('section[id]'),
                    visibleClass = 'visible',
            nav = document.querySelector('nav'),
            navPath = nav.querySelector('svg path'),
            navListItems = [...nav.querySelectorAll('li')],
            navItems = navListItems.map(listItem => {

                const anchor = listItem.querySelector('a'),
                        targetID = anchor && anchor.getAttribute('href').slice(1),
                        target = document.getElementById(targetID);

                return { listItem, anchor, target };

                })
                .filter(item => item.target);

        // === Functions ===

        function drawPath() {

        let path = [], 
            pathIndent;

        navItems.forEach((item, i) => {
            const x = item.anchor.offsetLeft - 5,
                y = item.anchor.offsetTop,
                height = item.anchor.offsetHeight;

            if(i === 0) {
            
            path.push('M', x, y, 'L', x, y + height);
            item.pathStart = 0;

            } else {
            
            if(pathIndent !== x)
                path.push('L', pathIndent, y);
            
            path.push('L', x, y);
            
            navPath.setAttribute('d', path.join(' '));
            item.pathStart = navPath.getTotalLength() || 0;
            path.push('L', x, y + height);  
            }
            
            pathIndent = x;
            navPath.setAttribute('d', path.join(' '));
            item.pathEnd = navPath.getTotalLength();
        });
        }

        function syncPath() {
        
        const someElsAreVisible = () => 
                nav.querySelectorAll(`.${visibleClass}`).length > 0,
                thisElIsVisible = el =>
                el.classList.contains(visibleClass),
                pathLength = navPath.getTotalLength();

        let pathStart = pathLength,
            pathEnd = 0,
            lastPathStart,
            lastPathEnd;
        
        navItems.forEach(item => {
            if(thisElIsVisible(item.listItem)) {
            pathStart = Math.min(item.pathStart, pathStart);
            pathEnd = Math.max(item.pathEnd, pathEnd);
            }
        });

        if(someElsAreVisible() && pathStart < pathEnd) {
            
            if(pathStart !== lastPathStart || pathEnd !== lastPathEnd) {
            
            const dashArray = `1 ${pathStart} ${pathEnd - pathStart} ${pathLength}`;
            
            navPath.style.setProperty('stroke-dashoffset', '1');
            navPath.style.setProperty('stroke-dasharray', dashArray);
            navPath.style.setProperty('opacity', 1);
                }
                
        } else { 
            navPath.style.setProperty('opacity', 0);
        }
            
        lastPathStart = pathStart;
        lastPathEnd = pathEnd;
        }

        function markVisibleSection(observedEls) {
        
        observedEls.forEach(observedEl => {
            
            const id = observedEl.target.getAttribute('id'),
                anchor = document.querySelector(`nav li a[href="#${ id }"]`);
            
            if(!anchor)
            return false
            
            const listItem = anchor.parentElement;

            if (observedEl.isIntersecting) {
            listItem.classList.add(visibleClass);
            } else {
            listItem.classList.remove(visibleClass);
            }
            syncPath();
        }); 
        }

        // === Draw path and observe ===

        drawPath();

        const observer = new IntersectionObserver(markVisibleSection);
        elementsToObserve.forEach(thisEl => observer.observe(thisEl));
  }, []);

  return (
    <div className="section2">
      <div className="section2-container" id='section2'>
        <div className="animation-title-achievement">
          <h1 className='title-achievement'>My Achievements</h1>
        </div>
        <nav className='section2-nav'>
          <ul>
            <li>
              <a href="#intro">Intro</a>
            </li>
            <li>
              <a href="#first">First Achievement</a>
              <ul>
                <li>
                  <a href="#second">Second Achievement</a>
                  <ul>
                    <li>
                      <a href="#third">Third Achievement</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a href="#fourth">Fourth Achievement</a>
              <ul>
                <li>
                  <a href="#fifth">Fifth Achievement</a>
                </li>
                <li>
                  <a href="#sixth">Sixth Achievement</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#seventh">Seventh Achievement</a>
            </li>
            <li>
              <a href="#eighth">Eighth Achievement</a>
            </li>
            <li>
              <a href="#nineth">Nineth Achievement</a>
            </li>
            <li>
              <a href="#tenth">Tenth Achievement</a>
            </li>
          </ul>
          
          <svg xmlns="http://www.w3.org/2000/svg">
            <path />
          </svg>
        
        </nav>      
        <article id="top">
          <section id="intro">
            <h2>Intro</h2>
            <p>These represent the culmination of my achievements spanning from high school through university. Each accomplishment holds genuine merit, and none of them are 
              fabricated or merely predicted. Throughout this academic journey, I have consistently strived for excellence, dedicating time and effort to attain tangible successes. 
              From academic milestones to extracurricular accomplishments, each achievement serves as a testament to my commitment and hard work. It is important to emphasize that these are not mere assertions; 
              they are validated accomplishments that reflect my dedication and genuine contributions in both high school and university settings.</p>
          </section>
          
          <section id="first">
            
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>First Achievement</h2>
                <p className="date-got-achievement">22/12/2023</p>
                <p className="name-competition">NAVA-Thon</p>
                <p className='describe-achievement'>In a noteworthy accomplishment, we secured a gold medal in a hackathon for their groundbreaking solution—a Telegram chatbot 
                promoting positive parenting and child protection to combat violence. This innovative tool utilizes widespread accessibility to deliver crucial information, empowering 
                caregivers to create safer environments for children.</p>
              </div>
              <Carousel slides={firstCarouselSlides} />

            </div>
          </section>
          
          <section id="second">
            
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Second Achievement</h2>
                <p className="date-got-achievement">15/01/2022</p>
                <p className="name-competition">Angkor Mathematics competition</p>
                <p className='describe-achievement'>I was bestowed with an outstanding silver medal in recognition of my achievements, a remarkable accomplishment considering the challenging 
                competition with a participation pool of over 2000 individuals. This prestigious accolade not only highlights my individual excellence but also showcases my ability to stand out 
                among a large and diverse group of participants. Earning such a commendable distinction reflects the culmination of my hard work, dedication, and perseverance in the face of formidable competition.</p>
              </div>
              <Carousel slides={secondCarouselSlides} />
            </div>
          </section>
          
          <section id="third">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Third Achievement</h2>
                <p className="date-got-achievement">15/10/2021</p>
                <p className="name-competition">Mathematics outstanding students Cambodia</p>
                <p className='describe-achievement'>I am proud to highlight that I achieved the esteemed position as one of the top few finalists in the Math Outstanding Student Examination. This recognition not only 
                underscores my proficiency in mathematics but also signifies the culmination of sustained dedication and rigorous academic efforts. Securing a place among the select group of finalists in such a competitive 
                examination serves as a testament to my commitment to academic excellence and passion for the subject.</p>
              </div>
              <Carousel slides={thirdCarouselSlides} />
            </div>
          </section>
          
          <section id="fourth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Fourth Achievement</h2>
                <p className="date-got-achievement">19-22/06/2023</p>
                <p className="name-competition">NICC 9th Startup Camp (ICT)</p>
                <p className='describe-achievement'>I have successfully completed the intensive training course and achieved the required level of competence in the NICC 9th Startup Camp (ICT). This accomplishment showcases my
                 dedication and proficiency in the field, underscoring my commitment to staying abreast of technological advancements. It positions me as ready to excel in the dynamic landscape of Information and Communication Technology</p>
              </div>
              <Carousel slides={fourthCarouselSlides} />
            </div>
          </section>
          
          <section id="fifth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Fifth Achievement</h2>
                <p className="date-got-achievement">12/02/2023</p>
                <p className="name-competition">Coding & Programming by Python</p>
                <p className='describe-achievement'>This comprehensive program has deepened my understanding of Python programming, honing my skills in software development and problem-solving. I am excited to leverage this knowledge in real-world
                 applications and contribute to innovative projects. The experience at Samsung Innovation Campus has not only enriched my technical expertise but also fueled my passion for continuous learning and advancement in the field of programming.</p>
              </div>
              <Carousel slides={fifthCarouselSlides} />
            </div>
          </section>
          
          <section id="sixth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Sixth section</h2>
                <p className="date-got-achievement">28/07/2022</p>
                <p className="name-competition">PERSONAL DEVELOPMENT FINANCIAL LETERACY SKILL</p>
                <p className='describe-achievement'>This comprehensive program has equipped me with invaluable knowledge and skills in financial literacy, enhancing my ability to make informed and strategic decisions. I am excited to apply 
                these learnings to further my personal and professional development, contributing to my success in navigating the complex financial landscape.</p>
              </div>
              <Carousel slides={sixthCarouselSlides} />
            </div>
          </section>
          
          <section id="seventh">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Seventh section</h2>
                <p className="date-got-achievement">01/12/2020</p>
                <p className="name-competition">General English Program at SAS</p>
                <p className='describe-achievement'>This immersive program has significantly enhanced my proficiency in the English language, encompassing both written and spoken communication. The rigorous curriculum, coupled with experienced instructors, 
                has not only fortified my language skills but also fostered a deeper appreciation for linguistic nuances. I look forward to applying these enhanced abilities in academic, professional, and social settings, embracing the opportunities that effective communication brings.</p>
              </div>
              <Carousel slides={seventhCarouselSlides} />
            </div>
          </section>
          
          <section id="eighth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Eighth section</h2>
                <p className="date-got-achievement">13/06/2019</p>
                <p className="name-competition">English Language Program at Arizon School</p>
                <p className='describe-achievement'>This comprehensive program has refined my language skills, encompassing reading, writing, speaking, and listening. The engaging curriculum and dedicated instructors at Arizona School have played a pivotal 
                role in my linguistic development. I am eager to apply my advanced English proficiency in various aspects of my personal and professional life, embracing the confidence and capabilities gained through this program.</p>
              </div>
              <Carousel slides={eighthCarouselSlides} />
            </div>
          </section>

          <section id="nineth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Nineth section</h2>
                <p className="date-got-achievement">02/04/2018</p>
                <p className="name-competition">English Language Program at NYIS</p>
                <p className='describe-achievement'>This program has been instrumental in refining my language skills, encompassing reading, writing, listening, and speaking. The dynamic curriculum and supportive learning environment at New York International 
                School have contributed significantly to my linguistic development. I am excited to apply the knowledge and proficiency gained from this program to enhance my communication abilities in both academic and professional pursuits.</p>
              </div>
              <Carousel slides={ninethCarouselSlides} />
            </div>
          </section>

          <section id="tenth">
            <div className="container-achievement">
              <div className="group-description-image">
                <h2>Tenth section</h2>
                <p className="date-got-achievement">07/10/2021</p>
                <p className="name-competition">Computer Fundamental Skill</p>
                <p className='describe-achievement'>This course has equipped me with fundamental proficiency in essential office tools, enhancing my capabilities in document creation, data analysis, and presentation design. The hands-on training and guidance 
                received at Beltie International School have been invaluable in building a strong foundation in computer literacy.</p>
              </div>
              <Carousel slides={tenthCarouselSlides} />
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

export default Section2;