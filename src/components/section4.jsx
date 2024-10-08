import React, { useRef } from "react";
import emailjs from "emailjs-com";
import "../../public/css/section4.css";

const Section4 = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_cdsrz4u', 'template_wf3y5v8', form.current, 'U3D1sf70FCg3OkpBJ')
            .then((result) => {
                alert("Message Sent Successfully!");
            }, (error) => {
                console.error("Error:", error.text);
                alert("Failed to Send Message, please try again.");
            });
    };

    return (
        <div className="section4" id="section4">
            <div className="section4-container">
                <div className="animation-title-achievement">
                    <h1 className='title-achievement'>Get In Touch</h1>
                </div>
                <div className="seperate-column">
                    <div className="left-side-section4">
                        <form ref={form} onSubmit={sendEmail}>      
                            <div className="get-intouch">
                                <p className="get-intouch-text">Get In Touch</p>
                            </div>
                            <div>
                                <input type="text" id="name" name="name" placeholder="Name" required />
                            </div>
                            <div>
                                <input type="email" id="email" name="email" placeholder="Email" required />
                            </div>
                            <div>
                                <input type="text" id="subject" name="subject" placeholder="Subject" />
                            </div>
                            <div>
                                <textarea name="message" id="message" spellCheck="true" rows="10" cols="50" placeholder="Write a Message" required></textarea>
                            </div>
                            <div>
                                <input type="submit" id="saveForm" value="Send Message" />
                            </div>
                        </form>
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