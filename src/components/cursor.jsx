import React, { useEffect } from "react";
import "../../public/css/cursor.css";

const Cursor = () => {
    useEffect(() => {
        const coords = { x: 0, y: 0 };
        const circles = document.querySelectorAll(".circle");

        circles.forEach(function(circle) {
            circle.x = 0;
            circle.y = 0;
        });

        const handleMouseMove = (e) => {
            coords.x = e.clientX;
            coords.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        function animateCircle() {
            let x = coords.x;
            let y = coords.y;

            circles.forEach(function(circle, index) {
                circle.style.left = coords.x - 12 + 'px';
                circle.style.top = coords.y - 12 + 'px';

                circle.style.scale = (circles.length - index) / circles.length;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                x += (nextCircle.x - x) * 0.3;
                y += (nextCircle.y - y) * 0.3;
            });
            requestAnimationFrame(animateCircle);
        }

        animateCircle();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="cursor">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    );
}

export default Cursor;