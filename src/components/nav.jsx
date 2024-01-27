import React, { useState, useEffect } from "react";
import "../../public/css/nav.css";

const Nav = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(visible);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${visible ? "visible" : "hidden"}`}>
            <div className="nav-container">
                <div className="left-side">
                    <a href="#" className="btn-shine">
                        Thun.
                    </a>
                </div>
                <div className="right-side">
                    <a href="#" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Home
                    </a>
                    <a href="#section3" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Experience
                    </a>
                    <a href="#section2" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Achievement
                    </a>
                    <a href="#section4" className="nav-item">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Nav;