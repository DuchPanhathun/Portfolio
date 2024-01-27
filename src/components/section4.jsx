import React from "react";
import "../../public/css/section4.css";

const Section4 = () => {
    return (
        <div className="section4" id="section4">
            <div className="section4-container">
                <div className="animation-title-achievement">
                    <h1 className='title-achievement'>Get In Touch</h1>
                </div>
                <div className="seperate-column">
                    <div className="left-side-section4">
                        <div className="get-intouch">
                            <p className="get-intouch-text">Get In Touch</p>
                        </div>
                        <div>
                            <input type="text" id="Field1" placeholder="Your Name"/>
                        </div>
                        <div>
                            <input type="email" id="Field2" placeholder="Your Email"/> 
                        </div>
                        <div>
                            <input type="tel" id="Field3" placeholder="Your Phone"/>
                        </div>
                        <div>
                            <textarea id="Field4" name="Field4" spellCheck="true" rows="10" cols="50" placeholder="Write a Message"></textarea>
                        </div>
                        <div>
                            <input id="saveForm" name="saveForm" type="submit" value="Send Message" />
                        </div>
                    </div>
                    <div className="right-side-section4">
                        <div className="get-intouch">
                            <div className="get-intouch-text">My Contact Details</div>
                        </div>
                        <div className="contact-detail-container">
                            <label htmlFor="Email" className="form-label">Email</label>
                            <div className="txt-contact-detail">duchpanhathun@gmail.com</div>
                            <label htmlFor="Phone" className="form-label">Phone</label>
                            <div className="txt-contact-detail">+855 16 222 054</div>
                            <div className="txt-contact-detail">+855 12 964 225</div>
                            <label htmlFor="Address" className="form-label">Address</label>
                            <div className="txt-contact-detail">Phum Tangov, Songkat Nirot, <br />Khan Chba Ampov, Phnom Penh,<br /> Cambodia</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
export default Section4;