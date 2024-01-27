import React from "react";
import "../../public/css/section1.css";

const Section1 = () => {
    return (
        <div className="section1">
            <div className="section1-container">
                <div className="column-info-1">
                    <main class="container-personal-info">
                        <p>Hello 👋 I'm</p>
                        <section class="animation">
                            <div class="first-animation"><div>Duch Panhathun</div></div>
                            <div class="second-animation"><div>Web Developer</div></div>
                            <div class="third-animation"><div>Freelancer</div></div>
                        </section>
                    </main>
                    <h1 className="personal-info">SENIOR STUDENT OF MAJOR ITE AT RUPP</h1>
                    <p className="detail-info">Welcome to my official portfolio website, a curated space where I proudly showcase the culmination of my creative endeavors. Here, you'll find a comprehensive 
                    display of completed projects that reflect my skills, passion, and dedication, alongside exciting works currently in progress, providing a dynamic glimpse into my evolving artistic journey.</p>
                    <div className="group-btn">
                        <a href="#section4" className="contact-me-btn">Contact Me</a>
                        <a download href="../../public/img/my_cv.pdf" className="download-cv-btn">Download CV</a>
                    </div>
                    <div className="contact-function">
                        <a href="https://www.instagram.com/thun_nani?igsh=MTN4dmZ6cXkxM2EzMA=="><i class='bx bxl-instagram'></i></a>
                        <a href="https://www.facebook.com/profile.php?id=100026153991813&mibextid=9R9pXO"><i class='bx bxl-facebook'></i></a>
                        <a href="t.me/nhacool"><i class='bx bxl-telegram'></i></a>
                        <a href="https://www.linkedin.com/in/duch-panhathun-406336235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class='bx bxl-linkedin' ></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Section1;