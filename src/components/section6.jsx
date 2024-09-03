import { IonIcon } from 'ionicons';
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';
import React, { useEffect, useRef } from "react";
import "../../public/css/section6.scss";

const Section6 = () => {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const activate = (e) => {
            const items = slider.querySelectorAll(".item");
            if (e.target.matches(".next")) {
                slider.append(items[0]);
            }
            if (e.target.matches(".prev")) {
                slider.prepend(items[items.length - 1]);
            }
        };

        document.addEventListener("click", activate, false);

        return () => {
            document.removeEventListener("click", activate, false);
        };
    }, []);

    return (
        <div className="section6">
            <main>
                <div className="slider" ref={sliderRef}>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=1" loading="eager" alt="Lossless Youths" />
                        <div className="content">
                            <h2 className="title">"Lossless Youths"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=2" loading="eager" alt="Nobis Omnis" className="image" />
                        <div className="content">
                            <h2 className="title">"Estrange Bond"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=3" loading="eager" alt="Ut Distinctio" className="image" />
                        <div className="content">
                            <h2 className="title">"The Gate Keeper"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=4" loading="eager" alt="Commodi Veniam" className="image" />
                        <div className="content">
                            <h2 className="title">"Last Trace Of Us"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=5" loading="eager" alt="Ipsam Tenetur" className="image" />
                        <div className="content">
                            <h2 className="title">"Urban Decay"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                    <div className="item">
                        <img src="https://unsplash.it/1920/1080?random=6" loading="eager" alt="Nesciunt Consectetur Similique Sit" className="image" />
                        <div className="content">
                            <h2 className="title">"The Migration"</h2>
                            <p className="description">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.
                            </p>
                            <button>Read More</button>
                        </div>
                    </div>
                </div>
                <nav className="nav">
                    <button className="btn prev">
                        <IonIcon icon={arrowBackOutline} />
                    </button>
                    <button className="btn next">
                        <IonIcon icon={arrowForwardOutline} />
                    </button>
                </nav>
            </main>
        </div>
    );
}

export default Section6;
