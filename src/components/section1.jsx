import React from "react";
import "../../public/css/section1.css";

const Section1 = () => {
    return (
        <div className="section1">
            <div className="section1-container">
                <div className="column-info-1">
                    <main className="container-personal-info">
                        <p>Hello 👋 I'm</p>
                        <section className="animation">
                            <div className="first-animation"><div className="position-animation">Duch Panhathun</div></div>
                            <div className="second-animation"><div className="position-animation">Web Developer</div></div>
                            <div className="third-animation"><div className="position-animation">Freelancer</div></div>
                        </section>
                    </main>
                    <h1 className="personal-info">SENIOR STUDENT OF MAJOR ITE AT RUPP</h1>
                    <p className="detail-info">Welcome to my official portfolio website, a curated space where I proudly showcase the culmination of my creative endeavors. Here, you'll find a comprehensive 
                    display of completed projects that reflect my skills, passion, and dedication, alongside exciting works currently in progress, providing a dynamic glimpse into my evolving artistic journey.</p>
                    <div className="group-btn">
                        <a href="#section4" className="contact-me-btn glow-effect">Contact Me</a>
                        <a download href="../../public/img/my_cv.pdf" className="download-cv-btn glow-effect">Download CV</a>
                    </div>
                    <div className="contact-function">
                        <a href="https://www.instagram.com/thun_nani?igsh=MTN4dmZ6cXkxM2EzMA==" className="glow-effect"><i className='bx bxl-instagram'></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100026153991813&mibextid=9R9pXO" className="glow-effect"><i className='bx bxl-facebook'></i></a>
                        <a href="https://www.t.me/nhacool" className="glow-effect"><i className='bx bxl-telegram'></i></a>
                        <a href="https://www.linkedin.com/in/duch-panhathun-406336235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="glow-effect"><i className='bx bxl-linkedin' ></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Section1;