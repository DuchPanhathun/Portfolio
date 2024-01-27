import React, { useEffect } from "react";
import "../../public/css/menu.css";

const Menu = () => {
    useEffect(() => {
        const menu = document.querySelector(".menu");
        let menuVisible = false;

        const toggleMenu = command => {
            menu.style.display = command === "show" ? "block" : "none";
            menuVisible = !menuVisible;
        };

        const setPosition = ({ top, left }) => {
            menu.style.left = `${left}px`;
            menu.style.top = `${top}px`;
            toggleMenu("show");
        };

        const handleClick = () => {
            if (menuVisible) toggleMenu("hide");
        };

        const handleContextMenu = e => {
            e.preventDefault();
            const origin = {
                left: e.pageX,
                top: e.pageY
            };
            setPosition(origin);
            return false;
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    return (
        <div className="menu">
            <div className="menu-container">
                <ul className="menu-options">
                    <li className="menu-option">Back</li>
                    <li className="menu-option">Reload</li>
                    <li className="menu-option">Save</li>
                    <li className="menu-option">Save As</li>
                    <li className="menu-option">Inspect</li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
